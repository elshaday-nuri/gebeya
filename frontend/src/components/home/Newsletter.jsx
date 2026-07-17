import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Thank you for joining Gebeya!");
    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-text">
            <span className="newsletter-label">
              Stay connected
            </span>

            <h2>Get Special Offers From Gebeya</h2>

            <p>
              Join our newsletter for new products, exclusive discounts,
              and marketplace updates.
            </p>
          </div>

          <div className="newsletter-form-area">
            <form
              className="newsletter-form"
              onSubmit={subscribe}
            >
              <input
                type="email"
                value={email}
                placeholder="Enter your email address"
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

              <button type="submit">
                Subscribe
              </button>
            </form>

            {message && (
              <p className="newsletter-message">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;