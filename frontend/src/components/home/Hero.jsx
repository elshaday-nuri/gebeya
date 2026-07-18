import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">

        <div className="hero-text">

          <span className="hero-badge">
            🇪🇹 Ethiopia's Modern Marketplace
          </span>

          <h1>
            Shop Smarter.<br />
            Shop with <span>Gebeya.</span>
          </h1>

          <p>
            Discover quality electronics, fashion, home essentials,
beauty products, books, and authentic Ethiopian clothing,
jewelry, handcrafted goods, and cultural treasures
all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/" className="shop-btn">
              Shop Now
            </Link>

            <Link to="/deals" className="deal-btn">
              Today's Deals
            </Link>
          </div>

        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900"
            alt="Shopping"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;