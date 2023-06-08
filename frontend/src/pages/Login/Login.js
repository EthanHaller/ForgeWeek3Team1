import React, {useRef, useState} from 'react'
import "./Login.css"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/dashboard")
    } 
    catch {
      setError("Failed to log in")
    }
    
    setLoading(false)
  }

  return (
    <React.Fragment>
      <div>
        <h1>Log In</h1>
        {error}
        <form onSubmit={handleSubmit}>
          <label>Email <input ref={emailRef} id="email" type='email' /></label>
          <label>Password <input ref={passwordRef} id="password" type='password' /></label>
          <button disabled={loading} type='submit'>Log In</button>
        </form>
      </div>
      <div>
        <h2>Need an account? <Link to="/signup">Sign Up</Link></h2>
      </div>
    </React.Fragment>
  )
}
