import React from "react";
import { Link } from "react-router-dom";
import "../styles/Breadcrumbs.css";

function Breadcrumbs() {
  return (
    <nav className="nz-breadcrumbs" aria-label="Breadcrumb">
      <div className="nz-breadcrumbs__inner">
        <ol className="nz-breadcrumbs__list">
          <li>
            <Link to="/client-application-status" className="nz-breadcrumbs__link">
              Home
            </Link>
          </li>
          <li className="nz-breadcrumbs__sep" aria-hidden="true">
            <svg viewBox="0 0 12 9" className="nz-breadcrumbs__icon">
              <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z" />
            </svg>
          </li>
          <li>
            <a href="#work" onClick={(e) => e.preventDefault()} className="nz-breadcrumbs__link">
              Work
            </a>
          </li>
          <li className="nz-breadcrumbs__sep" aria-hidden="true">
            <svg viewBox="0 0 12 9" className="nz-breadcrumbs__icon">
              <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z" />
            </svg>
          </li>
          <li>
            <a href="#for-employers" onClick={(e) => e.preventDefault()} className="nz-breadcrumbs__link">
              For employers
            </a>
          </li>
          <li className="nz-breadcrumbs__sep" aria-hidden="true">
            <svg viewBox="0 0 12 9" className="nz-breadcrumbs__icon">
              <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z" />
            </svg>
          </li>
          <li>
            <a href="#resources" onClick={(e) => e.preventDefault()} className="nz-breadcrumbs__link">
              Resources, services and information to help employers
            </a>
          </li>
          <li className="nz-breadcrumbs__sep" aria-hidden="true">
            <svg viewBox="0 0 12 9" className="nz-breadcrumbs__icon">
              <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z" />
            </svg>
          </li>
          <li className="nz-breadcrumbs__current" aria-current="page">
            The Visa Verification Service
          </li>
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumbs;
