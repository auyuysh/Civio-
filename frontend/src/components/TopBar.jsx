import { useState, useEffect } from "react";
import "./TopBar.css";

function Topbar({ setShowModal, setMode, setRefreshKey, refreshKey }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(!!token);
    setUsername(storedUsername || "");
  }, [refreshKey]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="hero-container">
      <div className="nav-content">
        <div className="logo">Civio</div>

        <div className="nav-actions">
          <div className="auth-box" style={{ display: isLoggedIn ? "none" : "flex" }}>
            <button
              className="btn-auth"
              onClick={() => {
                setMode("register");
                setShowModal(true);
              }}
            >
              Register
            </button>
            <span className="slash">/</span>
            <button
              className="btn-auth"
              onClick={() => {
                setMode("login");
                setShowModal(true);
              }}
            >
              Login
            </button>
          </div>

          <div className="profile" style={{ display: isLoggedIn ? "flex" : "none" }}>
            <span className="profile-icon">👤</span>
            <span className="user-name">{username}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;