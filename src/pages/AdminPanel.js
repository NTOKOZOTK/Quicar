"use client"

import { useState } from "react"

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("cars")

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === "cars" ? "active" : ""} onClick={() => setActiveTab("cars")}>
          Cars
        </button>
        <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
          Users
        </button>
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
          Orders
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "cars" && (
          <div className="cars-management">
            <h2>Car Management</h2>
            <button className="add-car-btn">Add New Car</button>
            <div className="cars-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Toyota</td>
                    <td>Camry</td>
                    <td>2022</td>
                    <td>$25,000</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="users-management">
            <h2>User Management</h2>
            <div className="users-stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>1,234</p>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p>987</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-management">
            <h2>Order Management</h2>
            <div className="orders-stats">
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>456</p>
              </div>
              <div className="stat-card">
                <h3>Pending Orders</h3>
                <p>23</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
