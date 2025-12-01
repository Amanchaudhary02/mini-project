import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">📚</span>
        <span>CampusNotes</span>
      </div>
      <div className="nav-links">
        <a href="#upload">Upload</a>
        <a href="#browse">Browse</a>
      </div>
    </nav>
  );
}
