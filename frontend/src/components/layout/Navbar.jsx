import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo/logo.png";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const cleanSearch = search.trim();

    if (cleanSearch) {
      navigate(`/?search=${encodeURIComponent(cleanSearch)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="gebeya-navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <img
            src={logo}
            alt="Gebeya logo"
            className="logo-image"
          />

          <span className="logo-text">Gebeya</span>
        </Link>

        <form
          className="search-box"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            value={search}
            placeholder="Search clothing, jewelry, electronics..."
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit">
            Search
          </button>
        </form>

        <div className="navbar-actions">
          <Link to="/">Home</Link>

          <Link to="/cart">Cart</Link>

          {user ? (
  <>
    <Link to="/orders">My Orders</Link>

    {user.role === "admin" && (
      <Link to="/admin" className="admin-nav-link">
        Admin Dashboard
      </Link>
    )}

    <span className="navbar-user-name">
      Hello, {user.name}
    </span>

    <button
      type="button"
      className="logout-button"
      onClick={logout}
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </>
)}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;