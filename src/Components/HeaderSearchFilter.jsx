import './HeaderSearchFilter.css';

export const HeaderSearchFilter = ({ category, onSearchChange, onSortChange }) => {
  return (
    <div className="header-search-filter">
      <h2>{category}</h2>
      <div className="header-actions">
        <input
          type="text"
          placeholder="Search on this page"
          onChange={onSearchChange}
        />
        <select onChange={onSortChange}>
          <option value="recent">Recently Added</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
          <option value="nameZA">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default HeaderSearchFilter;
