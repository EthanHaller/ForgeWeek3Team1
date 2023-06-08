import React, { useState } from 'react'
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <React.Fragment>
      <h1>Profile</h1>
      {error}
      <strong>Email:</strong> {currentUser.email}
      {/* <Link to="/update-profile"><button>Update Profile</button></Link> */}
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </React.Fragment>
  )
}
