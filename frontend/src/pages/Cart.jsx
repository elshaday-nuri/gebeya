import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Cart() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const loadCart = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/cart/${user.id}`);

      setCart(response.data);
    } catch (err) {
      console.error(err);
      setError("Your cart could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1 || newQuantity > item.stock) {
      return;
    }

    try {
      setUpdatingId(item.id);

      await api.put(`/cart/${item.id}`, {
        quantity: newQuantity,
      });

      setCart((currentCart) =>
        currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: newQuantity,
              }
            : cartItem
        )
      );
    } catch (err) {
      console.error(err);
      setError("Quantity could not be updated.");
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (id) => {
    try {
      setUpdatingId(id);

      await api.delete(`/cart/${id}`);

      setCart((currentCart) =>
        currentCart.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Product could not be removed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price) * Number(item.quantity),
      0
    );
  }, [cart]);

  const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 6.99;

  const total = subtotal + shipping;

  if (!user) {
    return (
      <main className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🔐</div>

            <h1>Login to view your cart</h1>

            <p>
              Sign in to add products and continue shopping.
            </p>

            <Link to="/login" className="cart-primary-link">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="cart-page">
        <div className="container">
          <p className="cart-loading">Loading your cart...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <div className="cart-page-heading">
          <div>
            <span className="section-label">
              Your selections
            </span>

            <h1>Shopping Cart</h1>

            <p>
              {cart.length} item
              {cart.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <Link to="/" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>

        {error && (
          <p className="cart-error-message">{error}</p>
        )}

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your cart is empty</h2>

            <p>
              Explore our collections and add something you love.
            </p>

            <Link to="/" className="cart-primary-link">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <section className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <Link
                    to={`/product/${item.product_id}`}
                    className="cart-item-image"
                  >
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/400x400?text=Gebeya"
                      }
                      alt={item.name}
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://placehold.co/400x400?text=Gebeya";
                      }}
                    />
                  </Link>

                  <div className="cart-item-details">
                    <Link to={`/product/${item.product_id}`}>
                      <h2>{item.name}</h2>
                    </Link>

                    <p className="cart-stock">
                      {item.stock > 0
                        ? `${item.stock} available`
                        : "Out of stock"}
                    </p>

                    <p className="cart-unit-price">
                      ${Number(item.price).toFixed(2)} each
                    </p>

                    <button
                      type="button"
                      className="remove-cart-button"
                      onClick={() => removeItem(item.id)}
                      disabled={updatingId === item.id}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-quantity-area">
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item,
                            item.quantity - 1
                          )
                        }
                        disabled={
                          item.quantity <= 1 ||
                          updatingId === item.id
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item,
                            item.quantity + 1
                          )
                        }
                        disabled={
                          item.quantity >= item.stock ||
                          updatingId === item.id
                        }
                      >
                        +
                      </button>
                    </div>

                    <strong>
                      $
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toFixed(2)}
                    </strong>
                  </div>
                </article>
              ))}
            </section>

            <aside className="order-summary">
              <h2>Order Summary</h2>

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

              {subtotal < 50 && (
                <p className="free-shipping-message">
                  Add ${(50 - subtotal).toFixed(2)} more for free
                  shipping.
                </p>
              )}

              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="checkout-button"
                onClick={() => navigate("/checkout")}
              >
                Continue to Checkout
              </button>

              <p className="secure-checkout-message">
                🔒 Secure checkout
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;