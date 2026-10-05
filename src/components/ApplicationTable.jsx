function ApplicationTable({
  applications,
  onEdit,
  onDelete,
}) {
  function getDaysAgo(date) {
    const today = new Date();
    const appliedDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    appliedDate.setHours(0, 0, 0, 0);

    const difference =
      today.getTime() - appliedDate.getTime();

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days === 0) {
      return "Today";
    }

    if (days === 1) {
      return "1 day ago";
    }

    if (days < 0) {
      return "Upcoming";
    }

    return `${days} days ago`;
  }

  return (
    <section className="applications">
      <div className="table-header">
        <h2>Applications</h2>
        <span>
          {applications.length} application
          {applications.length !== 1 ? "s" : ""}
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <h3>No applications found</h3>
          <p>
            Add your first job application using the
            form above.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Location</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.company}</td>

                  <td>{application.role}</td>

                  <td>{application.location}</td>

                  <td>
                    <div>{application.date}</div>

                    <small className="days-ago">
                      {getDaysAgo(application.date)}
                    </small>
                  </td>

                  <td>
                    <span
                      className={`status ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => onEdit(application)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          onDelete(application.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ApplicationTable;