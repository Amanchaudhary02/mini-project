import React from "react";

export default function NotesGrid({ notes, loading, API_BASE }) {
  const handleDownload = async (note) => {
    // increase download count
    await fetch(`${API_BASE}/api/files/${note.id}/download`, {
      method: "POST",
    });
    window.open(note.fileUrl, "_blank");
  };

  return (
    <section className="card notes-card" id="browse">
      <div className="notes-header">
        <h2>Notes Library</h2>
        <p className="card-subtitle">
          Filtered in real-time as you type. Most recent uploads appear first.
        </p>
      </div>
      {loading && <p>Loading notes...</p>}
      {!loading && notes.length === 0 && (
        <p className="empty-state">
          No notes yet. Be the first one to upload! 🚀
        </p>
      )}
      <div className="notes-grid">
        {notes.map((note) => (
          <article key={note.id} className="note-card fade-in">
            <div className="note-tag">{note.type}</div>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-meta">
              {note.course} • Sem {note.semester} • {note.subject}
            </p>
            {note.description && (
              <p className="note-desc">{note.description}</p>
            )}
            <div className="note-footer">
              <button
                className="secondary-btn small"
                onClick={() => handleDownload(note)}
              >
                Download
              </button>
              <span className="note-downloads">
                ⬇ {note.downloads} downloads
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
