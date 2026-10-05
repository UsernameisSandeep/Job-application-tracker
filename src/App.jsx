import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationTable from "./components/ApplicationTable";
import SearchFilter from "./components/SearchFilter";

import "./App.css";

function App() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("jobApplications");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    date: "",
    status: "Applied",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("jobApplications", JSON.stringify(applications));
  }, [applications]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.company || !form.role || !form.location || !form.date) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setApplications(
        applications.map((application) =>
          application.id === editingId
            ? { ...application, ...form }
            : application
        )
      );

      setEditingId(null);
    } else {
      const newApplication = {
        id: Date.now(),
        ...form,
      };

      setApplications([...applications, newApplication]);
    }

    setForm({
      company: "",
      role: "",
      location: "",
      date: "",
      status: "Applied",
    });
  }

  function handleEdit(application) {
    setForm({
      company: application.company,
      role: application.role,
      location: application.location,
      date: application.date,
      status: application.status,
    });

    setEditingId(application.id);

    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (confirmed) {
      setApplications(
        applications.filter((application) => application.id !== id)
      );
    }
  }

  function cancelEdit() {
    setEditingId(null);

    setForm({
      company: "",
      role: "",
      location: "",
      date: "",
      status: "Applied",
    });
  }

  const filteredApplications = applications
    .filter((application) => {
      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.role
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" ||
        application.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <div>
          <h1>Job Application Tracker</h1>
          <p>Track your job applications in one place</p>
        </div>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main className="container">
        <Dashboard applications={applications} />

        <ApplicationForm
          form={form}
          editingId={editingId}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelEdit={cancelEdit}
        />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <ApplicationTable
          applications={filteredApplications}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <footer>
        <p>Job Application Tracker • Built with React.js</p>
      </footer>
    </div>
  );
}

export default App;