import React from "react";

export default function Hero({ setFilterText }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title">
          Share notes.
          <span className="accent"> Help your juniors.</span>
        </h1>
        <p className="hero-subtitle">
          A clean, central place for your college notes, assignments, and
          previous year papers. Upload once, help hundreds.
        </p>
        <div className="hero-actions">
          <a href="#upload" className="primary-btn">
            Upload Notes
          </a>
          <a href="#browse" className="secondary-btn">
            Browse Library
          </a>
        </div>
      </div>
      <div className="hero-card animated-float">
        <p className="hero-card-title">Search notes instantly</p>
        <input
          placeholder="Search by subject, course, semester..."
          className="hero-search"
          onChange={(e) => setFilterText(e.target.value)}
        />
        <p className="hero-hint">Try: "DBMS", "OOP", "IT 3rd Sem" 🔍</p>
      </div>
    </section>
  );
}
