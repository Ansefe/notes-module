import { useState } from "react";
import FilterNavBar from "./components/FilterNavBar";
import NotesList from "./components/NotesList";
import "./App.css";
import Header from "./components/Header";
import { ALL } from "./components/utils/constants";

function App() {
  const [activeTab, setActiveTab] = useState(ALL);

  const handleClickTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header />
      <div className="d-flex">
        <div className="bg-secondary min-width-228"></div>
        <div className="">
          <div className="noteContainer">
            <div className="d-flex justify-content-between employer-title align-items-center">
              <span className="employer-notes fw-medium">
                Acme Brick Employer Notes
              </span>
              <span className="fw-bold text-dark view-details">
                View Employer Details
              </span>
            </div>
            <FilterNavBar
              handleClickTab={handleClickTab}
              activeTab={activeTab}
            />
          </div>
          <NotesList activeTab={activeTab} />
          <div className="bg-secondary footer"></div>
        </div>
      </div>
    </>
  );
}

export default App;
