import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Phones, laptops and accessories",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Modern styles for every occasion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=700&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Everything your home needs",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Beauty",
    description: "Beauty and personal care",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Books",
    description: "Stories, learning and inspiration",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=700&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Sports",
    description: "Fitness and outdoor essentials",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&auto=format&fit=crop",
  },
];

function Categories() {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-heading categories-heading">
          <div>
            <span className="section-label">Find what you love</span>
            <h2>Shop by Category</h2>
          </div>

          <Link to="/categories" className="view-all-link">
            View all categories →
          </Link>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/?category=${encodeURIComponent(category.name)}`}
              className="category-card"
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />

              <div className="category-overlay"></div>

              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span>Explore collection →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;