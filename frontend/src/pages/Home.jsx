import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import Deals from "../components/home/Deals";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import EthiopianCollection from "../components/home/EthiopianCollection";
import ProductCard from "../components/common/ProductCard";

import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm =
    searchParams.get("search")?.toLowerCase() || "";

  const selectedCategory =
    searchParams.get("category") || "All";

  const selectedSort =
    searchParams.get("sort") || "default";

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Products could not be loaded.");
      });
  }, []);

  const categoryOptions = useMemo(() => {
    const categories = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...new Set(categories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const description =
        product.description?.toLowerCase() || "";

      const matchesSearch =
        name.includes(searchTerm) ||
        category.includes(searchTerm) ||
        description.includes(searchTerm);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (selectedSort === "price-low") {
      result = [...result].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (selectedSort === "price-high") {
      result = [...result].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (selectedSort === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedSort,
  ]);

  const updateCategory = (event) => {
    const newParams = new URLSearchParams(searchParams);

    if (event.target.value === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", event.target.value);
    }

    setSearchParams(newParams);
  };

  const updateSort = (event) => {
    const newParams = new URLSearchParams(searchParams);

    if (event.target.value === "default") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", event.target.value);
    }

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams();

    if (searchTerm) {
      newParams.set("search", searchTerm);
    }

    setSearchParams(newParams);
  };

  const isFiltering =
    searchTerm ||
    selectedCategory !== "All" ||
    selectedSort !== "default";

  return (
    <>
      {!isFiltering && <Hero />}

      {!isFiltering && <Categories />}

      <section className="products-section">
        <div className="container">
          <div className="section-heading products-heading">
            <div>
              <span className="section-label">
                {isFiltering
                  ? "Browse products"
                  : "Explore our collection"}
              </span>

              <h2>
                {searchTerm
                  ? `Results for "${searchTerm}"`
                  : selectedCategory !== "All"
                    ? selectedCategory
                    : "Featured Products"}
              </h2>

              <p className="products-count">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="product-filters">
              <label>
                Category

                <select
                  value={selectedCategory}
                  onChange={updateCategory}
                >
                  {categoryOptions.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Sort by

                <select
                  value={selectedSort}
                  onChange={updateSort}
                >
                  <option value="default">
                    Featured
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="name">
                    Name: A to Z
                  </option>
                </select>
              </label>

              {isFiltering && (
                <button
                  type="button"
                  className="clear-filters-button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {error && (
            <p className="error-message">{error}</p>
          )}

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔎</div>

              <h3>No products found</h3>

              <p>
                Try another search term or choose a different
                category.
              </p>

              <button
                type="button"
                className="clear-results-button"
                onClick={clearFilters}
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {!isFiltering && (
        <>
          <EthiopianCollection products={products} />
          <Deals />
          <WhyChooseUs />
          <Testimonials />
          <Newsletter />
        </>
      )}
    </>
  );
}

export default Home;