import { useState } from "react";
import "./AuthModal.css";

function AuthModal({ setShowModal, mode, setMode, setRefreshKey }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const url =
      mode === "login"
        ? "http://127.0.0.1:8000/api/auth/login/"
        : "http://127.0.0.1:8000/api/auth/register/";

    const body =
      mode === "login"
        ? { username, password }
        : { username, password, email };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setLoading(false);
    setIsSuccess(false);

    if (mode === "login") {
      if (data.access) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("username", username);
        setMessage("Login successful!");
        setIsSuccess(true);
        setRefreshKey((prev) => prev + 1);
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      } else {
        setMessage(data.detail || "Wrong credentials");
      }
    } else {
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("Registered successfully! Now login.");
        setIsSuccess(true);
        setMode("login");
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {mode === "register" && (
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? <span className="spinner"></span> : mode === "login" ? "Login" : "Register"}
        </button>

        {message && (
          <p className={isSuccess ? "success" : "error"}>{message}</p>
        )}

        <p
          className="switch"
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default AuthModal;