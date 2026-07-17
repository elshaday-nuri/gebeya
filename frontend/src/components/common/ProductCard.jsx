import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

function ProductCard({ product }) {
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [adding, setAdding] = useState(false);

  const addToCart = async () => {
    if (!user) {
      setMessage("Please login to add items.");
      return;
    }

    try {
      setAdding(true);
      setMessage("");

      await api.post("/cart", {
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
      });

      setMessage("Added to cart!");
    } catch (error) {
      console.error(error);
      setMessage("Could not add product.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="product-card">
      <div className="product-image-area">
        <Link to={`/product/${product.id}`}>
          <img
            src={
              product.image ||
              "https://placehold.co/500x400?text=Gebeya+Product"
            }
            alt={product.name}
            className="product-image"
          />
        </Link>

        {product.stock > 0 ? (
          <span className="stock-badge in-stock">
            In stock
          </span>
        ) : (
          <span className="stock-badge out-of-stock">
            Sold out
          </span>
        )}

        <button
          type="button"
          className="wishlist-button"
          aria-label={`Save ${product.name}`}
        >
          ♡
        </button>
      </div>

      <div className="product-card-content">
        <span className="product-category">
          {product.category || "General"}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        <div className="product-rating">
          <span>★★★★★</span>
          <small>(24)</small>
        </div>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-card-footer">
          <p className="product-price">
            ${Number(product.price).toFixed(2)}
          </p>

          <button
            type="button"
            className="add-cart-button"
            onClick={addToCart}
            disabled={adding || product.stock <= 0}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        {message && (
          <p className="product-message">
            {message}
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;