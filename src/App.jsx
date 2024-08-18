import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('all');

  const handleClickTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleClickTab('all')}
          >
            All
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => handleClickTab('general')}
          >
            General
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'assessment' ? 'active' : ''}`}
            onClick={() => handleClickTab('assessment')}
          >
            Assessment
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'planning' ? 'active' : ''}`}
            onClick={() => handleClickTab('planning')}
          >
            Planning
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === 'all' && <div className="tab-pane active">Content for All</div>}
        {activeTab === 'general' && <div className="tab-pane active">Content for General</div>}
        {activeTab === 'assessment' && <div className="tab-pane active">Content for Assessment</div>}
        {activeTab === 'planning' && <div className="tab-pane active">Content for Planning</div>}
      </div>
    </div>
    </>
  )
}

export default App
