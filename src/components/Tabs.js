"use client"

import { useState } from "react"

function Tabs({ tabs, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab] && <div className="tab-pane active">{tabs[activeTab].content}</div>}
      </div>
    </div>
  )
}

export default Tabs
