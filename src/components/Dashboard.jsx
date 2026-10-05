function Dashboard({ applications }) {
  const total = applications.length;

  const applied = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const selected = applications.filter(
    (application) => application.status === "Selected"
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  return (
    <section className="dashboard">
      <div className="card">
        <h3>Total Applications</h3>
        <p>{total}</p>
      </div>

      <div className="card">
        <h3>Applied</h3>
        <p>{applied}</p>
      </div>

      <div className="card">
        <h3>Interviews</h3>
        <p>{interviews}</p>
      </div>

      <div className="card">
        <h3>Selected</h3>
        <p>{selected}</p>
      </div>

      <div className="card">
        <h3>Rejected</h3>
        <p>{rejected}</p>
      </div>
    </section>
  );
}

export default Dashboard;