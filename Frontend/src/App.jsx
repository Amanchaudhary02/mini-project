import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import UploadForm from "./components/UploadForm.jsx";
import NotesGrid from "./components/NotesGrid.jsx";

const API_BASE = "http://localhost:5000";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/files`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((n) =>
    (n.title + n.subject + n.course + n.semester)
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <div className="app">
      <div className="bg-gradient"></div>
      <Navbar />
      <main className="main">
        <Hero setFilterText={setFilterText} />
        <section className="content-section">
          <UploadForm API_BASE={API_BASE} onUploadSuccess={fetchNotes} />
          <NotesGrid
            notes={filteredNotes}
            loading={loading}
            API_BASE={API_BASE}
          />
        </section>
      </main>
      <footer className="footer">
        Made for college students ✨ Share. Learn. Grow.
      </footer>
    </div>
  );
}
