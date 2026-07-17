import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2>Gebeya</h2>

          <p>
            A modern marketplace for quality products,
            trusted shopping, and everyday convenience.
          </p>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-column">
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        <div className="footer-column">
          <h3>Help</h3>
          <a href="#">Customer Support</a>
          <a href="#">Shipping Information</a>
          <a href="#">Returns</a>
          <a href="#">Track Order</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            © 2026 Gebeya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;