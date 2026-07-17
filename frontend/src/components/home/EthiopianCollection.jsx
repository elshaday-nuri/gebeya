import ProductCard from "../common/ProductCard";

function EthiopianCollection({ products }) {
  const ethiopianProducts = products.filter(
    (product) => product.category === "Ethiopian Collection"
  );

  if (ethiopianProducts.length === 0) {
    return null;
  }

  return (
    <section className="ethiopian-section">
      <div className="container">
        <div className="ethiopian-heading">
          <div>
            <span className="ethiopian-label">
              Rooted in culture
            </span>

            <h2>Ethiopian Collection</h2>

            <p>
              Discover traditional clothing, handmade accessories,
              home décor, and culturally inspired products.
            </p>
          </div>

          <div className="ethiopian-pattern">
            ◆ ◇ ◆ ◇ ◆
          </div>
        </div>

        <div className="product-grid">
          {ethiopianProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EthiopianCollection;