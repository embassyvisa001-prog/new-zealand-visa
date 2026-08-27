import React, { useEffect, useState } from "react";
import { createClient } from "../api/client.api";
import "../styles/NewApplication.css";

function NewApplication({ onOpenFaq }) {
  const [formData, setFormData] = useState({
    applicationCategory: "",
    givenName: "",
    surname: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    countryOfCitizenship: "",
    placeOfBirth: "",
    passportNumber: "",
    status: "",
    agreedToTerms: false,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submittedClient, setSubmittedClient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "study_visa", name: "Student Visa" },
    { id: "work_visa", name: "Work Visa" },
    { id: "tourist_visa", name: "Tourist Visa" },
  ];

  const genders = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" }
  ];

  const statuses = [
    { id: "Pending", name: "Pending" },
    { id: "Revoked", name: "Revoked" },
    { id: "Refused", name: "Refused" },
    { id: "Issued", name: "Issued" },
  ];


  useEffect(() => {
    document.title = "New Application - Immigration New Zealand Admin Portal";
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.applicationCategory ||
      !formData.givenName ||
      !formData.surname ||
      !formData.email ||
      !formData.password ||
      !formData.dob ||
      !formData.address ||
      !formData.phone ||
      !formData.placeOfBirth ||
      !formData.countryOfCitizenship ||
      !formData.passportNumber
    ) {
      setErrorMsg("Please fill in all required fields marked with *.");
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    if (!formData.agreedToTerms) {
      setErrorMsg("You must accept the certification and terms to submit a new application.");
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const categoryObj = categories.find((c) => c.id === formData.applicationCategory);
    const categoryName = categoryObj ? categoryObj.name : formData.applicationCategory;

    const genderObj = genders.find((g) => g.id === formData.gender);
    const genderName = genderObj ? genderObj.name : "Male";

    const payload = {
      Category: categoryName,
      FullName: `${formData.givenName.trim()} ${formData.surname.trim()}`,
      Email: formData.email.trim(),
      Password: formData.password.trim(),
      Gender: genderName,
      Address: formData.address.trim(),
      telephone: formData.phone.trim(),
      DOB: formData.dob,
      POB: formData.placeOfBirth.trim(),
      CountryofCitizenship: formData.countryOfCitizenship.trim(),
      PassportNumber: formData.passportNumber.trim(),
      Status: formData.status || "Pending",
    };

    try {
      const result = await createClient(payload);
      setSubmittedClient(result);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(err.message || "An error occurred while submitting your application.");
      setIsSubmitting(false);
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setFormData({
      applicationCategory: "",
      givenName: "",
      surname: "",
      gender: "",
      address: "",
      email: "",
      password: "",
      phone: "",
      dob: "",
      countryOfCitizenship: "",
      placeOfBirth: "",
      passportNumber: "",
      status: "",
      agreedToTerms: false,
    });
    setSubmittedClient(null);
    setErrorMsg("");
  };

  if (submittedClient) {
    const refId = submittedClient._id || submittedClient.PassportNumber || "APP-" + Math.floor(10000000 + Math.random() * 90000000);
    return (
      <div className="new-application-page">
        <div className="section-heading">
          <h1 className="section-heading__title">New Application Submitted
          </h1>
          <span className="section-heading__subtitle">
            ONLY FOR ADMIN
          </span>
        </div>

        <div className="status-card">
          <div className="alert-box alert-box--success" style={{ backgroundColor: "#d4edda", borderColor: "#c3e6cb", color: "#155724", padding: "16px", marginBottom: "20px", borderRadius: "4px" }}>
            <h2 style={{ fontSize: "1.25rem", margin: "0 0 8px 0" }}>Application Successfully Created</h2>
            <p style={{ margin: 0 }}>
              Your application has been logged into the system. Your Application Reference / Passport Number is: <strong>{submittedClient.PassportNumber || refId}</strong>.
            </p>
          </div>

          <div className="status-card__summary">
            <div>
              <span className="status-card__label">Category:</span>{" "}
              <span className="status-card__value">
                {submittedClient.Category}
              </span>
            </div>
            <div>
              <span className="status-card__label">Applicant Name:</span>{" "}
              <span className="status-card__value">{submittedClient.FullName}</span>
            </div>
            <div>
              <span className="status-card__label">Email:</span>{" "}
              <span className="status-card__value">{submittedClient.Email}</span>
            </div>
            <div>
              <span className="status-card__label">User Password:</span>{" "}
              <span className="status-card__value" style={{ color: "#d9534f", fontWeight: "bold" }}>{submittedClient.Password || formData.password}</span>
            </div>
            <div>
              <span className="status-card__label">Status:</span>{" "}
              <span className="status-pill">{submittedClient.Status || "Pending"}</span>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <p className="content-text">
              An acknowledgment email with further details and instruction guides has been dispatched to <strong>{formData.email}</strong>. Keep your application reference number safe to track your progress.
            </p>
          </div>

          <div className="status-card__actions" style={{ marginTop: "24px" }}>
            <button type="button" onClick={handleReset} className="primary-button">
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="new-application-page">
      <div className="section-heading">
        <h1 className="section-heading__title">New Application</h1>
      </div>

      <div className="new-application__quick-links">
        <button type="button" onClick={onOpenFaq} className="link-button">
          <abbr title="Frequently Asked Questions">FAQ</abbr>
        </button>{" "}
        |{" "}
        <span className="new-application__quick-link-active">
          Application Intake
        </span>
      </div>

      {errorMsg && (
        <div className="alert-box alert-box--error" role="alert">
          <div className="alert-box__title">
            <span className="alert-box__icon alert-box__icon--error">!</span>
            <span>Submission Error</span>
          </div>
          <p className="alert-box__body alert-box__body--error">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="new-application__form">
        <section className="new-application__section">
          <h2 className="section-subtitle">1. Application Type</h2>
          <div className="content-card">
            <div className="field-row">
              <label htmlFor="applicationCategory" className="field-row__label">
                Select Application Category *
              </label>
              <div className="field-row__control">
                <select
                  id="applicationCategory"
                  value={formData.applicationCategory}
                  onChange={(e) =>
                    handleChange("applicationCategory", e.target.value)
                  }
                  className="text-control"
                  required
                >
                  <option value="">-- Choose Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <h2 className="section-subtitle">
            2. Applicant Personal Information
          </h2>
          <div className="content-card">
            <div className="field-row">
              <label htmlFor="givenName" className="field-row__label">
                Given Name(s) <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="givenName"
                  type="text"
                  value={formData.givenName}
                  onChange={(e) => handleChange("givenName", e.target.value)}
                  placeholder="First and middle names as in passport"
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="surname" className="field-row__label">
                Surname<span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                  placeholder="Surname"
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="gender" className="field-row__label">
                Gender <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="text-control"
                  required
                >
                  <option value="">-- Choose Gender --</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {gender.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="address" className="field-row__label">
                Address <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Address"
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="email" className="field-row__label">
                Email Address <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="name@example.com"
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="password" className="field-row__label">
                User Login Password <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="password"
                  type="text"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Create user password (to share with applicant)"
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="phone" className="field-row__label">
                Telephone Number <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 1234567890"
                  className="text-control"
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="dob" className="field-row__label">
                Date of Birth <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="placeOfBirth" className="field-row__label">
                Place of Birth <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="placeOfBirth"
                  type="text"
                  value={formData.placeOfBirth}
                  onChange={(e) => handleChange("placeOfBirth", e.target.value)}
                  placeholder="Place of Birth"
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <label
                htmlFor="countryOfCitizenship"
                className="field-row__label"
              >
                Country of Citizenship <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="countryOfCitizenship"
                  type="text"
                  value={formData.countryOfCitizenship}
                  onChange={(e) =>
                    handleChange("countryOfCitizenship", e.target.value)
                  }
                  placeholder="e.g. Canada, India, United States"
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row field-row--last">
              <label htmlFor="passportNumber" className="field-row__label">
                Passport Number <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <input
                  id="passportNumber"
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) =>
                    handleChange("passportNumber", e.target.value)
                  }
                  placeholder="Official document number"
                  className="text-control"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="status" className="field-row__label">
                Status <span className="required">*</span>
              </label>
              <div className="field-row__control">
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="text-control"
                  required
                >
                  <option value="">-- Choose Status --</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <h2 className="section-subtitle">3. Certification & Declaration</h2>
          <div className="content-card">
            <p className="content-text">
              By submitting this application form, I certify that all
              information provided is true, accurate, and complete to the best
              of my knowledge. I understand that misrepresentation may result in
              refusal of this application.
            </p>
            <div className="checkbox-row" style={{ marginTop: "16px" }}>
              <input
                id="agreeNewApp"
                type="checkbox"
                checked={formData.agreedToTerms}
                onChange={(e) =>
                  handleChange("agreedToTerms", e.target.checked)
                }
                className="checkbox-row__input"
              />
              <label htmlFor="agreeNewApp" className="checkbox-row__label">
                I declare that the information provided is complete and true.
              </label>
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: "24px" }}>
            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting Application..."
                : "Add New Application"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="secondary-button"
            >
              Clear Form
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default NewApplication;
