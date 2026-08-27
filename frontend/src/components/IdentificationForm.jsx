import React, { useState } from "react";
import "../styles/IdentificationForm.css";

const helpTopics = {
  email:
    "Enter the email address registered with your visa application.",
  password:
    "Enter the password provided to you by the administrator.",
};

function IdentificationForm({ onSubmitIdent, onBack, onOpenFaq, isLoading = false, apiError = "" }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [activeHelp, setActiveHelp] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMsg("Please enter both your Email Address and Password to log in.");
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }
    onSubmitIdent(formData);
  };

  const activeError = errorMsg || apiError;

  return (
    <div className="nz-ident">
      <div className="nz-ident__heading">
        <h1 className="nz-ident__title">Visa Verification Service Login</h1>
        <p className="nz-ident__subtitle">Log in using your registered Email ID and Password</p>
      </div>

      <div className="nz-ident__quick-links">
        <button type="button" onClick={onOpenFaq} className="nz-ident__link-btn">
          FAQ
        </button>{" "}
        | <span className="nz-ident__active-step">User Access Login</span>
      </div>

      <div className="nz-notice-row">
        <span className="nz-notice-row__icon">ℹ</span>
        <span>Enter your registered Email ID and the Password issued by the administration to view your visa details.</span>
      </div>

      {activeError && (
        <div className="nz-alert nz-alert--error" role="alert">
          <strong>Authentication Error:</strong> {activeError}
        </div>
      )}

      {activeHelp && (
        <div className="nz-help-box">
          <button
            type="button"
            onClick={() => setActiveHelp(null)}
            className="nz-help-box__close"
          >
            &times;
          </button>
          <p className="nz-help-box__title">Help Information:</p>
          <p>{helpTopics[activeHelp]}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="nz-ident__form">
        <div className="nz-ident__card">
          <h3 className="nz-ident__card-title">User Login Credentials</h3>

          {/* Email */}
          <div className="nz-form-group">
            <label htmlFor="email" className="nz-form-label">
              Registered Email Address: <span className="nz-required">*</span>
            </label>
            <div className="nz-form-control-row">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="registered.email@example.com"
                className="nz-input"
                required
              />
              <button
                type="button"
                onClick={() => setActiveHelp("email")}
                className="nz-help-btn"
              >
                Help
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="nz-form-group">
            <label htmlFor="password" className="nz-form-label">
              Password: <span className="nz-required">*</span>
            </label>
            <div className="nz-form-control-row">
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                className="nz-input"
                required
              />
              <button
                type="button"
                onClick={() => setActiveHelp("password")}
                className="nz-help-btn"
              >
                Help
              </button>
            </div>
          </div>
        </div>

        <div className="nz-ident__actions">
          <button type="submit" className="nz-btn nz-btn--login" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Log In & View Status"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="nz-btn nz-btn--outline-dark"
            disabled={isLoading}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default IdentificationForm;
