import React, { useEffect } from "react";

const Navbar = ({ onTabChange }) => {
  useEffect(() => {
    // Initialize tooltips after the component mounts
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach((el) => {
      new window.bootstrap.Tooltip(el);
    });
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">
        <a href="/"><img src="https://media.emailtests.com/demo/logo_icon-name-white.png" alt="Logo" height="50" /></a>
      </span>
      <div className="toolbar-icons">
        <button
          className="btn btn-link"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Editor View"
          onClick={() => onTabChange("preview")}
        >
          <i className="bi bi-window"></i>
        </button>

        <button
          className="btn btn-link"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Email Client Preview"
          onClick={() => onTabChange("litmus")}
        >
          <i className="bi bi-envelope-open-heart"></i>
        </button>

        <button
          className="btn btn-link"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Settings"
          onClick={() => onTabChange("settings")}
        >
          <i className="bi bi-gear"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
