function FilterSidebar({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) {
  return (
    <aside className="filter-sidebar">
      <h2 className="filter-title">Filters</h2>

      <div className="filter-group">
        <label className="filter-label">
          Minimum Price
        </label>

        <input
          type="number"
          className="filter-input"
          placeholder="₹ Enter minimum price"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">
          Maximum Price
        </label>

        <input
          type="number"
          className="filter-input"
          placeholder="₹ Enter maximum price"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </aside>
  );
}

export default FilterSidebar;
