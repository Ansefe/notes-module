import PropTypes from "prop-types";
import { menuOptions } from "../utils/constants";

const FilterNavBar = ({ activeTab, handleClickTab }) => (
  <div className="container pl-2">
    <ul className="nav nav-tabs px-4">
      {menuOptions.map(({ code, label }) => (
        <li className="nav-item" key={code}>
          <button
            className={`nav-link ${activeTab === code ? "active" : ""}`}
            onClick={() => handleClickTab(code)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

FilterNavBar.propTypes = {
  activeTab: PropTypes.number,
  handleClickTab: PropTypes.func.isRequired,
};

export default FilterNavBar;
