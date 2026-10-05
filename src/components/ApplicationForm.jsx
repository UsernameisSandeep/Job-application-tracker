function ApplicationForm({
  form,
  editingId,
  handleChange,
  handleSubmit,
  cancelEdit,
}) {
  return (
    <section className="form-section">
      <h2>
        {editingId
          ? "Edit Application"
          : "Add New Application"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="role"
            placeholder="Job Role"
            value={form.role}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="primary-button">
            {editingId ? "Update Application" : "Add Application"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ApplicationForm;