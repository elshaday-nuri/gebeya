import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Checkout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] =
    useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    shipping_name: user?.name || "",
    shipping_email: user?.email || "",
    shipping_phone: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_zip: "",
    payment_method: "cash_on_delivery",
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    api
      .get(`/cart/${user.id}`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Checkout information could not be loaded.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price) * Number(item.quantity),
      0
    );
  }, [cart]);

  const shipping =
    subtotal === 0 || subtotal >= 50 ? 0 : 6.99;

  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      setPlacingOrder(true);
      setError("");

      const response = await api.post(
        "/orders/checkout",
        {
          user_id: user.id,
          ...form,
        }
      );

      navigate(
        `/order-success/${response.data.order_id}`,
        {
          state: response.data,
        }
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Your order could not be placed."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!user) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h1>Login required</h1>

            <p>
              Please login before continuing to checkout.
            </p>

            <Link
              to="/login"
              className="cart-primary-link"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="checkout-page">
        <p className="cart-loading">
          Loading checkout...
        </p>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h1>Your cart is empty</h1>

            <Link
              to="/"
              className="cart-primary-link"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <div className="checkout-heading">
          <span className="section-label">
            Complete your purchase
          </span>

          <h1>Checkout</h1>
        </div>

        {error && (
          <p className="cart-error-message">{error}</p>
        )}

        <form
          className="checkout-layout"
          onSubmit={placeOrder}
        >
          <section className="checkout-form-card">
            <h2>Shipping Information</h2>

            <div className="checkout-form-grid">
              <label>
                Full Name
                <input
                  name="shipping_name"
                  value={form.shipping_name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="shipping_email"
                  value={form.shipping_email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  name="shipping_phone"
                  value={form.shipping_phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="full-field">
                Street Address
                <input
                  name="shipping_address"
                  value={form.shipping_address}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                City
                <input
                  name="shipping_city"
                  value={form.shipping_city}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                State
                <input
                  name="shipping_state"
                  value={form.shipping_state}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                ZIP Code
                <input
                  name="shipping_zip"
                  value={form.shipping_zip}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <h2 className="payment-heading">
              Payment Method
            </h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment_method"
                value="cash_on_delivery"
                checked={
                  form.payment_method ===
                  "cash_on_delivery"
                }
                onChange={handleChange}
              />

              <span>
                <strong>Cash on Delivery</strong>
                <small>
                  Pay when your order arrives.
                </small>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment_method"
                value="card_demo"
                checked={
                  form.payment_method === "card_demo"
                }
                onChange={handleChange}
              />

              <span>
                <strong>Card Payment — Demo</strong>
                <small>
                  No real payment will be processed yet.
                </small>
              </span>
            </label>
          </section>

          <aside className="checkout-summary">
            <h2>Your Order</h2>

            <div className="checkout-items">
              {cart.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <strong>
                    $
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "Free"
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="place-order-button"
              type="submit"
              disabled={placingOrder}
            >
              {placingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>

            <p className="secure-checkout-message">
              🔒 Your information is protected
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;