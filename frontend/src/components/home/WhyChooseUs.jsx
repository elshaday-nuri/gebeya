const benefits = [
  {
    id: 1,
    icon: "🚚",
    title: "Fast Delivery",
    description:
      "Reliable delivery with clear updates from checkout to your doorstep.",
  },
  {
    id: 2,
    icon: "🔒",
    title: "Secure Shopping",
    description:
      "Your account and payment information are protected throughout your order.",
  },
  {
    id: 3,
    icon: "↩️",
    title: "Easy Returns",
    description:
      "Simple return options when a product does not meet your expectations.",
  },
  {
    id: 4,
    icon: "💬",
    title: "Helpful Support",
    description:
      "Our support team is ready to help with products, orders, and delivery.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="container">
        <div className="why-header">
          <span className="section-label">Shopping made simple</span>
          <h2>Why Shop With Gebeya?</h2>

          <p>
            We make online shopping convenient, secure, and enjoyable from the
            moment you browse until your order arrives.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.id}>
              <div className="benefit-icon">{benefit.icon}</div>

              <h3>{benefit.title}</h3>

              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;