import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Head from "./components/Head";
import Breadcrumbs from "./components/Breadcrumbs";
import ClientApplicationStatus from "./pages/ClientApplicationStatus";
import FaqModal from "./components/FaqModal";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isLoginRequested, setIsLoginRequested] = useState(false);

  const handleSearchSubmit = (query) => {
    if (!query) return;
    alert(`Searching Immigration New Zealand for: "${query}"`);
  };

  const handleLoginClick = () => {
    setIsLoginRequested(true);
  };

  return (
    <div className="app-shell">
      <Head
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onLoginClick={handleLoginClick}
      />

      <Breadcrumbs />

      <main className="app-shell__main" role="main">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/client-application-status" replace />}
          />
          <Route
            path="/client-application-status"
            element={
              <ClientApplicationStatus
                onOpenFaq={() => setIsFaqOpen(true)}
                isLoginRequested={isLoginRequested}
                onResetLoginRequested={() => setIsLoginRequested(false)}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/client-application-status" replace />}
          />
        </Routes>
      </main>

      {isFaqOpen && (
        <FaqModal onClose={() => setIsFaqOpen(false)} />
      )}

      <Footer />
    </div>
  );
}

export default App;
