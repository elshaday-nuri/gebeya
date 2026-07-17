import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();
  const location = useLocation();

  const order = location.state;

  return (
    <main className="order-success-page">
      <div className="container">
        <div className="order-success-card">
          <div className="success-icon">✓</div>

          <span className="section-label">
            Order confirmed
          </span>

          <h1>Thank you for shopping with Gebeya!</h1>

          <p>
            Your order has been placed successfully.
          </p>

          <div className="success-order-number">
            Order Number: <strong>#{id}</strong>
          </div>

          {order?.total && (
            <div className="success-total">
              Total: ${order.total}
            </div>
          )}

          <div className="success-actions">
            <Link
              to="/"
              className="cart-primary-link"
            >
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="success-orders-link"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;