const reviews = [
  {
    id: 1,
    name: "Dawit M.",
    initials: "DM",
    rating: 5,
    review:
      "Gebeya made shopping simple. The product arrived quickly and looked exactly like the photos.",
  },
  {
    id: 2,
    name: "Mariamwit E.",
    initials: "ME",
    rating: 5,
    review:
      "I love the clean website and easy checkout process. I will definitely shop here again.",
  },
  {
    id: 3,
    name: "Edom E.",
    initials: "EE",
    rating: 4,
    review:
      "The product selection is great, and customer support answered my question very quickly.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-label">Customer stories</span>
          <h2>Loved by Gebeya Shoppers</h2>

          <p>
            See what customers say about their shopping experience.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review) => (
            <article className="testimonial-card" key={review.id}>
              <div className="testimonial-stars">
                {"★".repeat(review.rating)}
                <span>{"★".repeat(5 - review.rating)}</span>
              </div>

              <p className="testimonial-text">
                “{review.review}”
              </p>

              <div className="testimonial-customer">
                <div className="customer-avatar">
                  {review.initials}
                </div>

                <div>
                  <h3>{review.name}</h3>
                  <p>Verified Customer</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;