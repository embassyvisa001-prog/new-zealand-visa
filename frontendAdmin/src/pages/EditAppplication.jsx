import React, { useEffect, useState } from "react";
import { getAClients, updateClient } from "../api/client.api";
import "../styles/NewApplication.css";

function EditAppplication({ onOpenFaq }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [selectedClient, setSelectedClient] = useState(null);

  const [formData, setFormData] = useState({
    Category: "",
    FullName: "",
    Email: "",
    Password: "",
    Gender: "Male",
    Address: "",
    telephone: "",
    DOB: "",
    POB: "",
    CountryofCitizenship: "",
    PassportNumber: "",
    Status: "Pending",
    Paragraph: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "Student Visa", name: "Student Visa" },
    { id: "Work Visa", name: "Work Visa" },
    { id: "Tourist Visa", name: "Tourist Visa" },
    { id: "Permanent Residence", name: "Permanent Residence" },
    { id: "Visitor Visa", name: "Visitor Visa" },
  ];

  const statuses = [
    { id: "Pending", name: "Pending" },
    { id: "Refused", name: "Refused" },
    { id: "Revoked", name: "Revoked" },
    { id: "Issued", name: "Issued" },
  ];

  useEffect(() => {
    document.title = "Edit Application - Immigration New Zealand Admin Portal";
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError("Please enter an Email or Passport Number to search.");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = searchQuery.includes("@")
        ? { Email: searchQuery.trim() }
        : { PassportNumber: searchQuery.trim() };

      const client = await getAClients(payload);
      setSelectedClient(client);

      setFormData({
        Category: client.Category || "",
        FullName: client.FullName || "",
        Email: client.Email || "",
        Password: client.Password || "",
        Gender: client.Gender || "Male",
        Address: client.Address || "",
        telephone: client.telephone || "",
        DOB: client.DOB ? client.DOB.split("T")[0] : "",
        POB: client.POB || "",
        CountryofCitizenship: client.CountryofCitizenship || "",
        PassportNumber: client.PassportNumber || "",
        Status: client.Status || "Pending",
        Paragraph: client.Paragraph || "",
      });

      setIsSearching(false);
    } catch (err) {
      setIsSearching(false);
      setSelectedClient(null);
      setSearchError(err.message || "No client application found matching your criteria.");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedClient._id) {
      setErrorMsg("No client application loaded to edit.");
      return;
    }

    if (
      !formData.Category ||
      !formData.FullName ||
      !formData.Email ||
      !formData.Password ||
      !formData.PassportNumber
    ) {
      setErrorMsg("Please fill in required fields (Category, Full Name, Email, Password, Passport Number).");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const updated = await updateClient(selectedClient._id, formData);
      setSelectedClient(updated);
      setIsSubmitting(false);
      setSuccessMsg(`Application for ${updated.FullName} (Passport: ${updated.PassportNumber}) was updated successfully!`);
      window.scrollTo({ top: 150, behavior: "smooth" });
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || "Failed to update application.");
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  return (
    <div className="new-application-page">
      <div className="section-heading">
        <h1 className="section-heading__title">Edit Application</h1>
        <span className="section-heading__subtitle">ADMINISTRATION PORTAL</span>
      </div>

      <div className="new-application__quick-links">
        <button type="button" onClick={onOpenFaq} className="link-button">
          <abbr title="Frequently Asked Questions">FAQ</abbr>
        </button>{" "}
        |{" "}
        <span className="new-application__quick-link-active">
          Search & Edit Intake
        </span>
      </div>

      {/* Search Section */}
      <section className="new-application__section" style={{ marginBottom: "24px" }}>
        <h2 className="new-application__section-title">Find Client Application</h2>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px", alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <label htmlFor="search-input" className="form-label" style={{ fontWeight: "600" }}>
              Search by Email or Passport Number
            </label>
            <input
              id="search-input"
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. client@example.com or AB1234567"
              style={{ width: "100%", padding: "10px", marginTop: "4px" }}
            />
          </div>
          <button type="submit" className="primary-button" disabled={isSearching} style={{ height: "42px", padding: "0 24px" }}>
            {isSearching ? "Searching..." : "Search Application"}
          </button>
        </form>

        {searchError && (
          <div className="alert-box alert-box--error" role="alert" style={{ marginTop: "16px" }}>
            <div className="alert-box__title">
              <span className="alert-box__icon alert-box__icon--error">!</span>
              <span>Search Error</span>
            </div>
            <p className="alert-box__body alert-box__body--error">{searchError}</p>
          </div>
        )}
      </section>

      {/* Messages */}
      {successMsg && (
        <div className="alert-box alert-box--success" style={{ backgroundColor: "#d4edda", borderColor: "#c3e6cb", color: "#155724", padding: "16px", marginBottom: "20px", borderRadius: "4px" }}>
          <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem" }}>Update Successful</h3>
          <p style={{ margin: 0 }}>{successMsg}</p>
        </div>
      )}

      {errorMsg && (
        <div className="alert-box alert-box--error" role="alert" style={{ marginBottom: "20px" }}>
          <div className="alert-box__title">
            <span className="alert-box__icon alert-box__icon--error">!</span>
            <span>Update Error</span>
          </div>
          <p className="alert-box__body alert-box__body--error">{errorMsg}</p>
        </div>
      )}

      {/* Edit Form */}
      {selectedClient && (
        <form onSubmit={handleSubmit} className="new-application__form">
          <section className="new-application__section">
            <h2 className="new-application__section-title">
              Editing Application: {selectedClient.FullName.toUpperCase()}
            </h2>

            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Application Status *</label>
                <select
                  className="form-control"
                  value={formData.Status}
                  onChange={(e) => handleChange("Status", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                >
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Category *</label>
                <select
                  className="form-control"
                  value={formData.Category}
                  onChange={(e) => handleChange("Category", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.FullName}
                  onChange={(e) => handleChange("FullName", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.Email}
                  onChange={(e) => handleChange("Email", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>User Login Password *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.Password}
                  onChange={(e) => handleChange("Password", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Passport Number *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.PassportNumber}
                  onChange={(e) => handleChange("PassportNumber", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Telephone</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.telephone}
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Gender</label>
                <select
                  className="form-control"
                  value={formData.Gender}
                  onChange={(e) => handleChange("Gender", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.DOB}
                  onChange={(e) => handleChange("DOB", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Place of Birth</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.POB}
                  onChange={(e) => handleChange("POB", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: "600" }}>Country of Citizenship</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.CountryofCitizenship}
                  onChange={(e) => handleChange("CountryofCitizenship", e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "4px" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <label className="form-label" style={{ fontWeight: "600" }}>Address</label>
              <textarea
                className="form-control"
                value={formData.Address}
                onChange={(e) => handleChange("Address", e.target.value)}
                rows={2}
                style={{ width: "100%", padding: "10px", marginTop: "4px" }}
              />
            </div>

            <div style={{ marginTop: "16px" }}>
              <label className="form-label" style={{ fontWeight: "600" }}>Status Description / Notes (Paragraph)</label>
              <textarea
                className="form-control"
                value={formData.Paragraph}
                onChange={(e) => handleChange("Paragraph", e.target.value)}
                rows={4}
                placeholder="Enter updates or details to present to the client..."
                style={{ width: "100%", padding: "10px", marginTop: "4px" }}
              />
            </div>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
              <button
                type="submit"
                className="primary-button"
                disabled={isSubmitting}
                style={{ padding: "10px 28px" }}
              >
                {isSubmitting ? "Saving Changes..." : "Save Application Changes"}
              </button>
            </div>
          </section>
        </form>
      )}
    </div>
  );
}

export default EditAppplication;
