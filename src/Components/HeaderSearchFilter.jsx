import "./HeaderSearchFilter.css";

export const HeaderSearchFilter = ({ title, searchTerm, setSearchTerm, sortOption, setSortOption }) => {
  return (
    <div className="container my-4">
      <div className="row align-items-center justify-content-between">
        {/* Dynamic Heading */}
        <div className="col-md-4">
          <h2 className="fw-bold">{title}</h2>
        </div>

        {/* Search & Sort */}
        <div className="col-md-8 d-flex justify-content-end align-items-center gap-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search on this page"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select w-25"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Recently Added</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="az">Name: A to Z</option>
            <option value="za">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchFilter;
