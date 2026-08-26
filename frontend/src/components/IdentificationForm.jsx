import React, { useState } from "react";
import "../styles/IdentificationForm.css";

const identTypes = [
  { id: "passport", label: "Passport Number" },
  { id: "inz_client", label: "Immigration NZ Client Number" },
  { id: "app_num", label: "Application Number" },
  { id: "nzeta", label: "NZeTA Reference Number" },
];

const helpTopics = {
  identType:
    "Select the document type you are using for visa verification. For most checks, Passport Number or INZ Client Number is recommended.",
  identNum:
    "Enter your Passport Number exactly as shown on your current passport (e.g. A12345678) or your INZ Client Number.",
  email:
    "Enter the email address registered with your visa application or RealMe account.",
  surname:
    "Enter your last name / family name exactly as shown on your current passport or official visa notification.",
  dob:
    "Enter your date of birth in dd/mm/yyyy format.",
  placeOfBirth:
    "Enter your country of passport / place of birth as stated on your passport.",
};

function IdentificationForm({ onSubmitIdent, onBack, onOpenFaq, isLoading = false, apiError = "" }) {
  const [formData, setFormData] = useState({
    identType: "passport",
    identNum: "",
    email: "",
    surname: "",
    dob: "",
    placeOfBirth: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [activeHelp, setActiveHelp] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.identNum && !formData.email) {
      setErrorMsg("Please enter a Passport / Identification Number or Email Address to search.");
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }
    onSubmitIdent(formData);
  };

  const activeError = errorMsg || apiError;

  return (
    <div className="nz-ident">
      <div className="nz-ident__heading">
        <h1 className="nz-ident__title">Visa Verification Service</h1>
        <p className="nz-ident__subtitle">Enter Visa Holder Identification Details</p>
      </div>

      <div className="nz-ident__quick-links">
        <button type="button" onClick={onOpenFaq} className="nz-ident__link-btn">
          FAQ
        </button>{" "}
        | <span className="nz-ident__active-step">Visa Details</span>
      </div>

      <div className="nz-notice-row">
        <span className="nz-notice-row__icon">ℹ</span>
        <span>Enter the details exactly as they appear in your current passport or visa approval notification.</span>
      </div>

      {activeError && (
        <div className="nz-alert nz-alert--error" role="alert">
          <strong>Search Error:</strong> {activeError}
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
          <h3 className="nz-ident__card-title">Verification Query Parameters</h3>

          {/* Document Type */}
          <div className="nz-form-group">
            <label htmlFor="identType" className="nz-form-label">
              Identification Type:
            </label>
            <div className="nz-form-control-row">
              <select
                id="identType"
                value={formData.identType}
                onChange={(e) => handleChange("identType", e.target.value)}
                className="nz-select"
              >
                {identTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setActiveHelp("identType")}
                className="nz-help-btn"
              >
                Help
              </button>
            </div>
          </div>

          {/* Passport / ID Number */}
          <div className="nz-form-group">
            <label htmlFor="identNum" className="nz-form-label">
              Passport / Identification Number: <span className="nz-required">*</span>
            </label>
            <div className="nz-form-control-row">
              <input
                id="identNum"
                type="text"
                value={formData.identNum}
                onChange={(e) => handleChange("identNum", e.target.value)}
                placeholder="e.g. A12345678"
                className="nz-input"
              />
              <button
                type="button"
                onClick={() => setActiveHelp("identNum")}
                className="nz-help-btn"
              >
                Help
              </button>
            </div>
          </div>

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

          {/* Surname / Family Name */}
          <div className="nz-form-group">
            <label htmlFor="surname" className="nz-form-label">
              Family Name / Surname:
            </label>
            <div className="nz-form-control-row">
              <input
                id="surname"
                type="text"
                value={formData.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
                placeholder="As shown in passport"
                className="nz-input"
              />
              <button
                type="button"
                onClick={() => setActiveHelp("surname")}
                className="nz-help-btn"
              >
                Help
              </button>
            </div>
          </div>

          {/* DOB */}
          <div className="nz-form-group">
            <label htmlFor="dob" className="nz-form-label">
              Date of Birth (dd/mm/yyyy):
            </label>
            <div className="nz-form-control-row">
              <input
                id="dob"
                type="text"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                placeholder="dd/mm/yyyy"
                className="nz-input"
              />
              <button
                type="button"
                onClick={() => setActiveHelp("dob")}
                className="nz-help-btn"
              >
                Help
              </button>
            </div>
          </div>

          {/* Place of Birth */}
          <div className="nz-form-group">
            <label htmlFor="placeOfBirth" className="nz-form-label">
              Passport Nationality / Place of Birth:
            </label>
            <div className="nz-form-control-row">
              <input
                id="placeOfBirth"
                type="text"
                value={formData.placeOfBirth}
                onChange={(e) => handleChange("placeOfBirth", e.target.value)}
                placeholder="Country of passport"
                className="nz-input"
              />
              <button
                type="button"
                onClick={() => setActiveHelp("placeOfBirth")}
                className="nz-help-btn"
              >
                Help
              </button>
            </div>
          </div>
        </div>

        <div className="nz-ident__actions">
          <button type="submit" className="nz-btn nz-btn--login" disabled={isLoading}>
            {isLoading ? "Verifying with INZ..." : "Search Visa Status"}
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
