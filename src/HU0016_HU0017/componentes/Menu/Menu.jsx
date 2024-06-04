import "../../HU0016_HU0017.css";

function Menu({
  onMenuClick,
  searchTerm,
  onSearchChange,
  toggleSearch,
  searchVisible,
  activeIndex,
}) {
  const handleItemClick = (index) => {
    onMenuClick(index);
  };

  return (
    <div className="menu016">
      <div
        style={{ alignItems: "center", justifyContent: "space-between" }}
        className="menu-row016"
      >
        <div style={{ display: "flex" }}>
          <div
            className={`menu-row-element016 ${
              activeIndex === 0 ? "active" : ""
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(0);
              }}
            >
              TALLERES
            </a>
          </div>
          <div
            className={`menu-row-element016 ${
              activeIndex === 1 ? "active" : ""
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(1);
              }}
            >
              SALAS
            </a>
          </div>
        </div>
        <div className="search-container">
          <input
            id="search"
            className={`search_input016 ${searchVisible ? "" : "hidden016"}`}
            placeholder="Escribe aquí..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          <a className="search-icon" onClick={toggleSearch}>
            <i className="fa-solid fa-magnifying-glass search-img"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menu;
