import React, { useState } from "react";
import "../styles/SecurityForm.css";

function SecurityForm({ onContinue, onCancel, onOpenFaq }) {
  const [isChecked, setIsChecked] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      setHasError(true);
      window.scrollTo({ top: 150, behavior: "smooth" });
    } else {
      setHasError(false);
      onContinue();
    }
  };

  return (
    <div className="nz-sec">
      <div className="nz-sec__heading">
        <h1 className="nz-sec__title">Visa Verification Service :: Terms & Security</h1>
        <p className="nz-sec__subtitle">Immigration New Zealand Online System Access</p>
      </div>

      <div className="nz-sec__quick-links">
        <button type="button" onClick={onOpenFaq} className="nz-sec__link-btn">
          FAQ
        </button>{" "}
        | <span className="nz-sec__active-step">Security Verification</span>
      </div>

      {hasError && (
        <div className="nz-alert nz-alert--error" role="alert">
          <div className="nz-alert__header">
            <span className="nz-alert__icon">!</span>
            <strong>Agreement Required</strong>
          </div>
          <p className="nz-alert__body">
            You must read and agree to the Immigration New Zealand terms and conditions to proceed with visa verification.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="nz-sec__form">
        <div className="nz-sec__card">
          <h3 className="nz-sec__card-title">Certification of Authority & Security Notice</h3>

          <section className="nz-sec__section">
            <h4 className="nz-sec__section-title">1. Authority to Query Visa Records</h4>
            <p>
              Using this online service confirms that you are either the visa holder, an authorized officer, employer, or registered third party with explicit verbal or written consent from the visa holder as required by law.
            </p>
          </section>

          <section className="nz-sec__section">
            <h4 className="nz-sec__section-title">2. Privacy & Data Security</h4>
            <ul className="nz-sec__list">
              <li>
                Immigration New Zealand is committed to protecting your privacy. Personal information accessed or collected through this portal is safeguarded under the New Zealand <em>Privacy Act 2020</em>.
              </li>
              <li>
                Data transmitted between your browser and our servers is encrypted using 256-bit Secure Sockets Layer (SSL/TLS) protocols.
              </li>
              <li>
                All record queries are logged for compliance and auditing purposes to prevent unauthorized access.
              </li>
            </ul>
          </section>

          <section className="nz-sec__section">
            <h4 className="nz-sec__section-title">3. Important Obligations</h4>
            <ol className="nz-sec__list nz-sec__list--ordered">
              <li>Keep all passport numbers and INZ client numbers confidential.</li>
              <li>Ensure you destroy or securely store any downloaded or printed verification statements when no longer required.</li>
            </ol>
          </section>
        </div>

        <div className="nz-sec__checkbox-row">
          <input
            id="agree"
            type="checkbox"
            name="securityInd"
            value="agree"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              if (e.target.checked) setHasError(false);
            }}
            className="nz-sec__checkbox"
          />
          <label htmlFor="agree" className="nz-sec__checkbox-label">
            I have read, understood and agree to the Immigration New Zealand Terms and Security Conditions.
          </label>
        </div>

        <div className="nz-sec__actions">
          <button type="submit" className="nz-btn nz-btn--login">
            Continue
          </button>
          <button
            type="button"
            onClick={() => {
              setIsChecked(false);
              setHasError(false);
              if (onCancel) onCancel();
            }}
            className="nz-btn nz-btn--outline-dark"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SecurityForm;
