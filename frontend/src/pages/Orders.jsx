import {
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Orders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    api
      .get(`/orders/${user.id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Your orders could not be loaded.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  const formatPayment = (paymentMethod) => {
    if (paymentMethod === "cash_on_delivery") {
      return "Cash on Delivery";
    }

    if (paymentMethod === "card_demo") {
      return "Card Payment — Demo";
    }

    return paymentMethod || "Not specified";
  };

  if (!user) {
    return (
      <main className="orders-page">
        <div className="container">
          <div className="empty-orders">
            <div className="empty-orders-icon">🔐</div>

            <h1>Login to view your orders</h1>

            <p>
              Your order history will appear here after you sign in.
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
      <main className="orders-page">
        <p className="orders-loading">
          Loading your orders...
        </p>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="container">
        <div className="orders-heading">
          <div>
            <span className="section-label">
              Account activity
            </span>

            <h1>My Orders</h1>

            <p>
              Review your purchases and delivery information.
            </p>
          </div>

          <Link
            to="/"
            className="continue-shopping-link"
          >
            Continue Shopping →
          </Link>
        </div>

        {error && (
          <p className="cart-error-message">
            {error}
          </p>
        )}

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">
              📦
            </div>

            <h2>You have not placed an order yet</h2>

            <p>
              Your completed purchases will appear here.
            </p>

            <Link
              to="/"
              className="cart-primary-link"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article
                className="order-card"
                key={order.id}
              >
                <div className="order-card-header">
                  <div>
                    <span className="order-number">
                      Order #{order.id}
                    </span>

                    <p>
                      Placed on{" "}
                      {formatDate(order.created_at)}
                    </p>
                  </div>

                  <span
                    className={`order-status order-status-${order.status}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-products">
                  {order.items.map((item) => (
                    <div
                      className="order-product"
                      key={item.id}
                    >
                      <Link
                        to={`/product/${item.product_id}`}
                        className="order-product-image"
                      >
                        <img
                          src={
                            item.image ||
                            "https://placehold.co/300x300?text=Gebeya"
                          }
                          alt={item.name}
                          onError={(event) => {
                            event.currentTarget.src =
                              "https://placehold.co/300x300?text=Gebeya";
                          }}
                        />
                      </Link>

                      <div className="order-product-info">
                        <Link
                          to={`/product/${item.product_id}`}
                        >
                          <h3>{item.name}</h3>
                        </Link>

                        <p>
                          Quantity: {item.quantity}
                        </p>

                        <strong>
                          $
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-information-grid">
                  <div>
                    <span>Delivery Address</span>

                    <p>
                      {order.shipping.name}
                      <br />

                      {order.shipping.address}
                      <br />

                      {order.shipping.city},{" "}
                      {order.shipping.state}{" "}
                      {order.shipping.zip}
                    </p>
                  </div>

                  <div>
                    <span>Payment</span>

                    <p>
                      {formatPayment(
                        order.payment_method
                      )}
                    </p>
                  </div>

                  <div>
                    <span>Order Total</span>

                    <p className="order-total">
                      ${Number(order.total).toFixed(2)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Orders;