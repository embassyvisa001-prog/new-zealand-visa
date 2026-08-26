import React from "react";
import "../styles/NzVisaVerificationPage.css";

function NzVisaVerificationPage({ onLoginClick }) {
  return (
    <div className="nz-page">
      <div className="nz-page__container">
        {/* Left Sidebar Menu */}
        <aside className="nz-sidebar">
          <div className="nz-sidebar__header">
            <span className="nz-sidebar__parent-label">Section</span>
            <h3 className="nz-sidebar__parent-title">
              Resources, services and information to help employers
            </h3>
          </div>
          <nav className="nz-sidebar__nav">
            <ul className="nz-sidebar__list">
              <li className="nz-sidebar__item">
                <a href="#visaview" onClick={(e) => e.preventDefault()} className="nz-sidebar__link">
                  VisaView for employers
                </a>
              </li>
              <li className="nz-sidebar__item">
                <a href="#skillfinder" onClick={(e) => e.preventDefault()} className="nz-sidebar__link">
                  Connecting you with skilled workers overseas using Skillfinder
                </a>
              </li>
              <li className="nz-sidebar__item">
                <a href="#check-work" onClick={(e) => e.preventDefault()} className="nz-sidebar__link">
                  Check if someone can legally work for you
                </a>
              </li>
              <li className="nz-sidebar__item">
                <a href="#applying" onClick={(e) => e.preventDefault()} className="nz-sidebar__link">
                  Applying for someone else
                </a>
              </li>
              <li className="nz-sidebar__item nz-sidebar__item--active">
                <a href="#verification-service" onClick={(e) => e.preventDefault()} className="nz-sidebar__link">
                  The Visa Verification Service
                </a>
              </li>
              <li className="nz-sidebar__item">
                <a href="#employee-left" onClick={(e) => e.preventDefault()} className="nz-sidebar__link">
                  Let us know if an employee has left your employment
                </a>
              </li>
              <li className="nz-sidebar__item">
                <a href="#updates" onClick={(e) => e.preventDefault()} className="nz-sidebar__link">
                  Updates for employers
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="nz-main">
          <header className="nz-main__header">
            <h1 className="nz-main__title">The Visa Verification Service</h1>
            <p className="nz-main__summary">
              You can check the details of a New Zealand visa using our online Visa Verification Service.
            </p>
          </header>

          {/* Section: About */}
          <section className="nz-card">
            <h2 className="nz-card__title">About the Visa Verification Service</h2>
            <div className="nz-card__content">
              <p>
                The details of current visa records held by Immigration New Zealand (INZ) can be checked online using the Visa Verification Service. You can view:
              </p>
              <ul className="nz-list">
                <li>information about a visa</li>
                <li>the personal details of the visa holder, and</li>
                <li>
                  the conditions of the visa — for example, how long the person can stay in New Zealand, and what they are allowed to do while they are here.
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Who can use */}
          <section className="nz-card">
            <h2 className="nz-card__title">Who can use the service</h2>
            <div className="nz-card__content">
              <p>
                Anyone can use the online service to check a New Zealand visa, so long as they have the consent of the person who has the visa, and a RealMe account.
              </p>
              <p>
                If you have a visa, you can check your own details or allow someone else (a 'third party') to check your details — for example, a bank, immigration adviser, health services provider, recruitment agency or sponsor.
              </p>

              <div className="nz-note">
                <div className="nz-note__badge">Note</div>
                <p>
                  The Visa Verification Service is provided through the VisaView system. INZ also offers VisaView services specifically for employers and education providers.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Checking a visa */}
          <section className="nz-card">
            <h2 className="nz-card__title">Checking a visa</h2>
            <div className="nz-card__content">
              <p>
                When using the service, you must first provide certain basic details about the visa. This gives you access to more information.
              </p>
              <p>
                Before a third-party user can check a visa, they must have the consent of the visa holder, either verbally or in writing. For example, consent can be given in a visa application form or in an employment contract.
              </p>

              <h3 className="nz-subtitle">If you do not want to share details online</h3>
              <p>If you do not want to give a third party access to your visa details online, you could instead provide them with copies of:</p>
              <ul className="nz-list">
                <li>your passport, with a current New Zealand visa label or border stamp</li>
                <li>your passport and visa approval notification</li>
                <li>your passport with an Australian permanent resident visa and/or a current resident return visa.</li>
              </ul>
            </div>
          </section>

          {/* Section: How to use (Login Action) */}
          <section className="nz-card" id="e5490">
            <h2 className="nz-card__title">How to use the Visa Verification Service</h2>
            <div className="nz-card__content">
              <p>
                To use the Visa Verification Service, you will first need to log in using RealMe. If you do not have an account, you will need to set one up.
              </p>

              <div className="nz-official-links">
                <p>
                  <a
                    href="#login"
                    className="nz-official-link"
                    onClick={(e) => {
                      e.preventDefault();
                      onLoginClick();
                    }}
                  >
                    Login{" "}
                    <svg viewBox="0 0 16 16" className="nz-ext-link-icon" fill="currentColor" aria-hidden="true">
                      <path d="M3.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V8.5a.5.5 0 0 0-1 0V12H4V4h3.5a.5.5 0 0 0 0-1H3.5z"/>
                      <path d="M9 3a.5.5 0 0 0 0 1h2.293L6.146 9.146a.5.5 0 1 0 .708.708L12 4.707V7a.5.5 0 0 0 1 0V3H9z"/>
                    </svg>
                  </a>
                </p>
              </div>

              <p>
                Once you have logged in, enter the following details for the visa you wish to check:
              </p>
              <ul className="nz-list">
                <li>family name</li>
                <li>passport nationality</li>
                <li>current passport number</li>
                <li>date of birth</li>
                <li>gender</li>
                <li>visa start date.</li>
              </ul>
              <p>
                You can find this information in your current passport, visa approval notification or visa label.
              </p>
              <p>
                The details must be entered exactly as they appear in your current visa.
              </p>
            </div>
          </section>

          {/* Section: What you can see */}
          <section className="nz-card">
            <h2 className="nz-card__title">What you can see</h2>
            <div className="nz-card__content">
              <p>
                Once you have entered the basic visa details of the visa you want to verify, the following information is made available:
              </p>
              <div className="nz-columns">
                <ul className="nz-list">
                  <li>Visa type</li>
                  <li>Visa start date</li>
                  <li>Number of entries</li>
                  <li>Immigration New Zealand (INZ) client number</li>
                  <li>Family and given names</li>
                  <li>Gender</li>
                </ul>
                <ul className="nz-list">
                  <li>Passport number</li>
                  <li>First entry before date</li>
                  <li>Expiry date travel</li>
                  <li>Visa expiry</li>
                  <li>Passport nationality</li>
                  <li>Visa conditions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Privacy rules */}
          <section className="nz-card">
            <h2 className="nz-card__title">Privacy rules</h2>
            <div className="nz-card__content">
              <p>As required by the Privacy Act 2020, all personal information must:</p>
              <ul className="nz-list">
                <li>only be used for lawful purposes</li>
                <li>only retained for as long as it is required</li>
                <li>only shared when authorised by the visa holder or in accordance with a lawful purpose</li>
                <li>be securely destroyed when no longer required (electronic and hard copy)</li>
                <li>be stored or shared in a secure manner.</li>
              </ul>
            </div>
          </section>

          {/* Section: Complaints & Contact */}
          <section className="nz-card">
            <h2 className="nz-card__title">Contact us & Complaints</h2>
            <div className="nz-card__content">
              <p>If you have any further questions about the Visa Verification Service, phone us on:</p>
              <ul className="nz-list">
                <li><strong>+64 9 969 1458</strong> from within the Auckland toll-free calling area</li>
                <li><strong>+64 4 910 9916</strong> from Wellington</li>
                <li><strong>0508 967 569</strong> from the rest of New Zealand</li>
              </ul>
              <p>For general visa enquiries telephone <strong>0508 558 855</strong>.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default NzVisaVerificationPage;
