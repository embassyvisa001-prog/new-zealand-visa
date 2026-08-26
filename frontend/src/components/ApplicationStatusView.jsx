import React from "react";
import "../styles/ApplicationStatusView.css";

function ApplicationStatusView({ clientData, onNewSearch }) {
  const name = clientData?.FullName || clientData?.surname || "N/A";
  const passportNumber = clientData?.PassportNumber || clientData?.identNum || "N/A";
  const pob = clientData?.POB || clientData?.placeOfBirth || "N/A";
  const citizenship = clientData?.CountryofCitizenship || pob;
  const status = clientData?.Status || "Pending";
  const category = clientData?.Category || "N/A";
  const email = clientData?.Email || "N/A";
  const paragraph = clientData?.Paragraph || "Currently the status is pending, the application is under review by Immigration New Zealand.";
  const formatDob = (rawDob) => {
    if (!rawDob) return "N/A";
    const d = new Date(rawDob);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return rawDob;
  };
  const dob = formatDob(clientData?.DOB);

  const getStatusBadgeClass = (statusStr) => {
    const lower = (statusStr || "").toLowerCase();
    if (lower === "issued" || lower === "approved" || lower === "granted") return "nz-badge--success";
    if (lower === "refused" || lower === "revoked" || lower === "declined") return "nz-badge--danger";
    return "nz-badge--warning";
  };

  return (
    <div className="nz-view">
      <div className="nz-view__header">
        <div className="nz-view__stamp-box">
          <img src="/Flag_of_NZ.png" alt="New Zealand Flag" className="nz-view__stamp-flag" />
          <div className="nz-view__stamp-text">
            <span className="nz-view__stamp-label">IMMIGRATION NEW ZEALAND</span>
            <span className="nz-view__stamp-title">VISA VERIFICATION STATEMENT</span>
          </div>
        </div>
      </div>

      <div className="nz-view__card">
        <div className="nz-view__section-header">
          <h2 className="nz-view__section-title">Visa Holder Details</h2>
          <span className={`nz-badge ${getStatusBadgeClass(status)}`}>{status.toUpperCase()}</span>
        </div>

        <div className="nz-view__grid">
          <div className="nz-view__field">
            <span className="nz-view__label">Full Name:</span>
            <span className="nz-view__value nz-view__value--bold">{name.toUpperCase()}</span>
          </div>

          <div className="nz-view__field">
            <span className="nz-view__label">Passport Number:</span>
            <span className="nz-view__value nz-view__value--code">{passportNumber}</span>
          </div>

          <div className="nz-view__field">
            <span className="nz-view__label">Visa Category:</span>
            <span className="nz-view__value">{category}</span>
          </div>

          <div className="nz-view__field">
            <span className="nz-view__label">Email Address:</span>
            <span className="nz-view__value">{email}</span>
          </div>

          <div className="nz-view__field">
            <span className="nz-view__label">Passport Nationality / POB:</span>
            <span className="nz-view__value">{citizenship}</span>
          </div>

          <div className="nz-view__field">
            <span className="nz-view__label">Date of Birth:</span>
            <span className="nz-view__value">{dob}</span>
          </div>
        </div>

        <div className="nz-view__comments-box">
          <h3 className="nz-view__comments-title">Immigration Officer Remarks / Conditions</h3>
          <p className="nz-view__comments-text">{paragraph}</p>
        </div>

        <div className="nz-view__disclaimer">
          <p>
            <strong>Note:</strong> This verification statement reflects current visa records held by Immigration New Zealand (INZ) as of {new Date().toLocaleDateString()}. Information supplied is subject to the provisions of the Privacy Act 2020.
          </p>
        </div>
      </div>

      <div className="nz-view__actions">
        <button type="button" onClick={onNewSearch} className="nz-btn nz-btn--login">
          Check Another Visa
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="nz-btn nz-btn--outline-dark"
        >
          Print Verification Statement
        </button>
      </div>
    </div>
  );
}

export default ApplicationStatusView;
