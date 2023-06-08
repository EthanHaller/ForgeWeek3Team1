import React, {useRef, useState} from 'react'
import "./Signup.css"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } 
    catch {
      setError("Failed to create an account")
    }
    
    setLoading(false)
  }

  return (
    <React.Fragment>
      <div className='container-signup'>
        <h1>Sign Up</h1>
        <h4>{error}</h4>
        <form onSubmit={handleSubmit}>
          <label>Email <input ref={emailRef} id="email" type='email' /></label>
          <label>Password <input ref={passwordRef} id="password" type='password' /></label>
          <label>Confirm Password <input ref={passwordConfirmRef} id="password-confirm" type='password' /></label>
          <button disabled={loading} type='submit'>Sign Up</button>
        </form>
        <h4>Already have an account? <Link to="/login">Log In</Link></h4>
      </div>
    </React.Fragment>
  )
}
