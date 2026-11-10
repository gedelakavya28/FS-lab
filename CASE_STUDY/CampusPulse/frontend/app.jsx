const { useEffect, useMemo, useState } = React;
const emptyForm = { name: "", email: "", course: "Computer Science", year: "1", status: "Active" };
function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);
  async function loadStudents() {
    setLoading(true);
    try {
      const response = await fetch("/api/students");
      if (!response.ok) throw new Error("Unable to load students.");
      setStudents(await response.json());
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { loadStudents(); }, []);
  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase();
    return students.filter((student) =>
      [student.name, student.email, student.course].some((value) => value.toLowerCase().includes(query))
    );
  }, [students, search]);
  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  async function submitForm(event) {
    event.preventDefault();
    setMessage({ type: "", text: "" });
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/students/${editingId}` : "/api/students";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = response.status === 204 ? null : await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed.");
      setMessage({ type: "success", text: editingId ? "Student updated successfully." : "Student added successfully." });
      setForm(emptyForm);
      setEditingId(null);
      await loadStudents();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  }
  function editStudent(student) {
    setEditingId(student._id);
    setForm({ name: student.name, email: student.email, course: student.course, year: String(student.year), status: student.status });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function deleteStudent(id) {
    if (!window.confirm("Delete this student record?")) return;
    const response = await fetch(`/api/students/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json();
      setMessage({ type: "error", text: data.error || "Delete failed." });
      return;
    }
    setMessage({ type: "success", text: "Student deleted successfully." });
    await loadStudents();
  }
  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">ACADEMIC ADMINISTRATION</p>
          <h1>Campus<span>Pulse</span></h1>
          <p className="subtitle">A simple, reliable workspace for keeping student records organised.</p>
        </div>
        <div className="hero-badge">CP<br /><small>v1.0</small></div>
      </header>
      <section className="stats">
        <div><strong>{students.length}</strong><span>Total students</span></div>
        <div><strong>{students.filter((student) => student.status === "Active").length}</strong><span>Active records</span></div>
        <div><strong>{new Set(students.map((student) => student.course)).size}</strong><span>Courses</span></div>
      </section>
      <section className="content-grid">
        <form className="card form-card" onSubmit={submitForm}>
          <div className="card-heading">
            <div><p className="eyebrow">RECORD FORM</p><h2>{editingId ? "Edit student" : "Add a student"}</h2></div>
            {editingId && <button type="button" className="link-button" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</button>}
          </div>
          <label>Full name<input name="name" value={form.name} onChange={updateField} placeholder="e.g. Ananya Rao" required /></label>
          <label>Email address<input name="email" type="email" value={form.email} onChange={updateField} placeholder="student@example.com" required /></label>
          <div className="two-col">
            <label>Course<select name="course" value={form.course} onChange={updateField}><option>Computer Science</option><option>Artificial Intelligence</option><option>Information Technology</option><option>Electronics</option></select></label>
            <label>Year<select name="year" value={form.year} onChange={updateField}><option value="1">Year 1</option><option value="2">Year 2</option><option value="3">Year 3</option><option value="4">Year 4</option></select></label>
          </div>
          <label>Status<select name="status" value={form.status} onChange={updateField}><option>Active</option><option>Inactive</option></select></label>
          <button className="primary-button" type="submit">{editingId ? "Save changes" : "Add student"} <span>→</span></button>
          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        </form>
        <section className="card list-card">
          <div className="card-heading list-heading">
            <div><p className="eyebrow">DIRECTORY</p><h2>Student records</h2></div>
            <input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search records..." />
          </div>
          {loading ? <p className="empty">Loading records...</p> : filteredStudents.length === 0 ? <p className="empty">No student records found.</p> : (
            <div className="table-wrap"><table><thead><tr><th>Student</th><th>Course</th><th>Year</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{filteredStudents.map((student) => <tr key={student._id}>
                <td><div className="student-name"><span className="avatar">{student.name.charAt(0)}</span><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td>
                <td>{student.course}</td><td>Year {student.year}</td><td><span className={`status ${student.status.toLowerCase()}`}>{student.status}</span></td>
                <td><button className="action" onClick={() => editStudent(student)}>Edit</button><button className="action danger" onClick={() => deleteStudent(student._id)}>Delete</button></td>
              </tr>)}</tbody>
            </table></div>
          )}
        </section>
      </section>
      <footer>CampusPulse · React + Express + MongoDB Atlas</footer>
    </main>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
