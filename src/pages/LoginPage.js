"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

function LoginPage() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { dispatch } = useApp()

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulate login
    dispatch({
      type: "LOGIN",
      payload: { phone, id: Date.now() },
    })
    navigate("/verification")
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="#signup">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
