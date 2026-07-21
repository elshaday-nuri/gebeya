import { useEffect, useState } from "react";
import api from "../services/api";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  category_id: "",
};

function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsResponse, categoriesResponse] =
        await Promise.all([
          api.get("/admin/products"),
          api.get("/admin/categories"),
        ]);

      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Admin information could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const addProduct = async (event) => {
    event.preventDefault();

    try {
      setAdding(true);
      setError("");
      setMessage("");

      const response = await api.post(
        "/admin/products",
        {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          category_id: Number(form.category_id),
        }
      );

      setMessage(response.data.message);
      setForm(emptyForm);

      await loadAdminData();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Product could not be added."
      );
    } finally {
      setAdding(false);
    }
  };
const deleteProduct = async (productId, productName) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${productName}"?`
  );

  if (!confirmed) {
    return;
  }

  try {
    setError("");
    setMessage("");

    const response = await api.delete(
      `/admin/products/${productId}`
    );

    setMessage(response.data.message);

    await loadAdminData();
  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.message ||
        "Product could not be deleted."
    );
  }
};
  if (loading) {
    return (
      <main className="container py-5">
        <p>Loading admin dashboard...</p>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="mb-5">
        <span className="section-label">
          Store management
        </span>

        <h1 className="mt-2">Admin Dashboard</h1>

        <p className="text-muted">
          Add products and manage your Gebeya inventory.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      <div className="card border-0 shadow-sm mb-5">
        <div className="card-body p-4">
          <h2 className="h4 mb-4">
            Add New Product
          </h2>

          <form onSubmit={addProduct}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  Product Name
                </label>

                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Price
                </label>

                <input
                  className="form-control"
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Stock
                </label>

                <input
                  className="form-control"
                  type="number"
                  name="stock"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Image URL
                </label>

                <input
                  className="form-control"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <button
                  className="btn btn-warning"
                  type="submit"
                  disabled={adding}
                >
                  {adding
                    ? "Adding Product..."
                    : "Add Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0">
              Products
            </h2>

            <span className="badge text-bg-dark">
              {products.length} products
            </span>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>

                    <td>
                      <img
                        src={
                          product.image ||
                          "https://placehold.co/80x80?text=Gebeya"
                        }
                        alt={product.name}
                        width="60"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://placehold.co/80x80?text=Gebeya";
                        }}
                      />
                    </td>

                    <td>{product.name}</td>
                    <td>{product.category}</td>

                    <td>
                      ${Number(product.price).toFixed(2)}
                    </td>

                    <td>{product.stock}</td>
                    <td>
  <button
    className="btn btn-sm btn-outline-danger"
    onClick={() =>
      deleteProduct(product.id, product.name)
    }
  >
    Delete
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Admin;