import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/client.api";

function AdminLogin({ isAdminLoggedIn, onLoginSuccess, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login - Immigration New Zealand Admin Portal";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await adminLogin({ username: username.trim(), password });
      setIsSubmitting(false);
      onLoginSuccess(response.token || "admin-authenticated");
      navigate("/new-application");
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || "Invalid admin credentials. Access denied.");
    }
  };

  return (
    <div className="new-application-page" style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div className="section-heading">
        <h1 className="section-heading__title">Admin Portal Authentication</h1>
        <p style={{ margin: "8px 0 0 0", color: "#555", fontSize: "0.95rem" }}>
          Authorized access only for Immigration New Zealand administration officers.
        </p>
      </div>

      {isAdminLoggedIn ? (
        <div className="status-card" style={{ marginTop: "24px" }}>
          <div
            className="alert-box alert-box--success"
            style={{
              backgroundColor: "var(--nz-green-bg)",
              borderColor: "var(--nz-green)",
              color: "var(--nz-green)",
              padding: "16px",
              marginBottom: "20px",
              borderRadius: "6px",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", margin: "0 0 8px 0", fontFamily: "'Outfit', sans-serif" }}>
              Logged In as Admin
            </h2>
            <p style={{ margin: 0 }}>
              You are currently authenticated as system administrator. You have full permission to create new applications and edit existing client applications.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/new-application")}
            >
              New Application
            </button>
            <button
              type="button"
              className="primary-button"
              style={{ backgroundColor: "var(--nz-navy-deeper)" }}
              onClick={() => navigate("/edit-application")}
            >
              Edit Application
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={onLogout}
              style={{ backgroundColor: "var(--nz-red)", color: "#fff", borderColor: "var(--nz-red)" }}
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="new-application__form" style={{ marginTop: "24px" }}>
          {errorMsg && (
            <div className="alert-box alert-box--error" role="alert" style={{ marginBottom: "20px" }}>
              <div className="alert-box__title">
                <span className="alert-box__icon alert-box__icon--error">!</span>
                <span>Authentication Error</span>
              </div>
              <p className="alert-box__body alert-box__body--error">{errorMsg}</p>
            </div>
          )}

          <section className="new-application__section">
            <h2 className="new-application__section-title">Admin Login</h2>

            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label htmlFor="admin-username" className="form-label" style={{ fontWeight: "600" }}>
                Username <span style={{ color: "#d9534f" }}>*</span>
              </label>
              <input
                id="admin-username"
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                autoFocus
                style={{ width: "100%", padding: "10px", marginTop: "6px" }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label htmlFor="admin-password" className="form-label" style={{ fontWeight: "600" }}>
                Password <span style={{ color: "#d9534f" }}>*</span>
              </label>
              <input
                id="admin-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                style={{ width: "100%", padding: "10px", marginTop: "6px" }}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button
                type="submit"
                className="primary-button"
                disabled={isSubmitting}
                style={{ padding: "10px 24px" }}
              >
                {isSubmitting ? "Authenticating..." : "Log In"}
              </button>
            </div>
          </section>
        </form>
      )}
    </div>
  );
}

export default AdminLogin;
