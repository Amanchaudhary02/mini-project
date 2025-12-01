import React, { useState } from "react";

export default function UploadForm({ API_BASE, onUploadSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    semester: "",
    course: "",
    type: "notes",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    fd.append("file", file);

    try {
      setUploading(true);
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setForm({
          title: "",
          description: "",
          subject: "",
          semester: "",
          course: "",
          type: "notes",
        });
        setFile(null);
        onUploadSuccess();
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="card upload-card" id="upload">
      <h2>Upload Notes / Assignments</h2>
      <p className="card-subtitle">
        Share your handwritten notes, PDFs, PPTs, or assignments with your
        batchmates and juniors.
      </p>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title (e.g., DBMS Unit 2 Notes)"
          />
          <input
            required
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject (e.g., DBMS)"
          />
        </div>
        <div className="form-row">
          <input
            required
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="Course (e.g., B.Tech IT)"
          />
          <input
            required
            name="semester"
            value={form.semester}
            onChange={handleChange}
            placeholder="Semester (e.g., 3)"
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description (e.g., Complete notes with examples)"
          rows={3}
        />
        <div className="form-row">
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="notes">Notes</option>
            <option value="assignment">Assignment</option>
            <option value="paper">Question Paper</option>
          </select>
          <label className="file-input">
            <span>{file ? file.name : "Choose file"}</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>
        </div>
        <button className="primary-btn full-width" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </section>
  );
}
