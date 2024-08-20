import PropTypes from "prop-types";
import { menuOptions } from "../utils/constants";
import "./styles.css";

const FilterNavBar = ({ activeTab, handleClickTab }) => (
  <div className="">
    <ul className="nav nav-tabs navbar-filter">
      {menuOptions.map(({ code, label }) => (
        <li className="nav-item" key={code}>
          <button
            className={`nav-link active text-primary ${
              activeTab === code ? "text-black" : "border-bottom text-dark"
            } filter-navbarli fw-medium`}
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
