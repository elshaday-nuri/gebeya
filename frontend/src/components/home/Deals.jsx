import { Link } from "react-router-dom";

function Deals() {
  return (
    <section className="deals-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">Limited-time offers</span>
            <h2>Today&apos;s Deals</h2>
          </div>

          <Link to="/deals" className="view-all-link">
            View all deals →
          </Link>
        </div>

        <div className="deals-grid">
          <article className="deal-card deal-card-large">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop"
              alt="Electronics deal"
            />

            <div className="deal-overlay"></div>

            <div className="deal-content">
              <span className="deal-tag">Up to 35% off</span>

              <h3>Smart Tech Deals</h3>

              <p>
                Upgrade your everyday life with smart devices and accessories.
              </p>

              <Link to="/deals" className="deal-shop-button">
                Shop Electronics
              </Link>
            </div>
          </article>

          <div className="deal-side-column">
            <article className="deal-card deal-card-small">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&auto=format&fit=crop"
                alt="Fashion deal"
              />

              <div className="deal-overlay"></div>

              <div className="deal-content">
                <span className="deal-tag">New season</span>
                <h3>Fresh Fashion</h3>

                <Link to="/deals" className="deal-text-link">
                  Explore styles →
                </Link>
              </div>
            </article>

            <article className="deal-card deal-card-small">
              <img
                src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=900&auto=format&fit=crop"
                alt="Home collection"
              />

              <div className="deal-overlay"></div>

              <div className="deal-content">
                <span className="deal-tag">Home refresh</span>
                <h3>Beautiful Spaces</h3>

                <Link to="/deals" className="deal-text-link">
                  Shop home →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Deals;