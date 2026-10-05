function SearchFilter({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  sortOrder,
  setSortOrder,
}) {
  return (
    <section className="filters">
      <input
        type="text"
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </section>
  );
}

export default SearchFilter;