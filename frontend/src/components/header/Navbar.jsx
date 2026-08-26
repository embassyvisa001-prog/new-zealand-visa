import React from "react";
import { Link } from "react-router-dom";
import "../../styles/header/Navbar.css";

function Navbar({ onLoginClick }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand-row">
          <Link
            to="/client-application-status"
            className="site-header__brand"
            aria-label="Immigration New Zealand"
          >
            {/* Primary New Zealand Logo */}
            <div className="site-header__logo-container" title="Immigration New Zealand Logo">
              <img
                src="/Flag_of_NZ.png"
                alt="Immigration New Zealand Logo"
                className="site-header__logo-img"
              />
            </div>

            {/* Official INZ Branding Title */}
            <div className="site-header__title-group">
              <span className="site-header__title-main">Immigration New Zealand</span>
              <span className="site-header__title-sub">Te Tāhuhu o Te Waihanga</span>
            </div>
          </Link>

          {/* Quick links & Login Action */}
          <div className="site-header__quicklinks">
            <a href="#process" className="site-header__quicklink" onClick={(e) => e.preventDefault()}>
              Process to apply
            </a>
            <a href="#employers" className="site-header__quicklink" onClick={(e) => e.preventDefault()}>
              For employers
            </a>
            <button
              type="button"
              className="site-header__login-btn"
              onClick={onLoginClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
