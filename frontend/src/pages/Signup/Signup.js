import React, {useRef, useState} from 'react'
import "./Signup.css"
import { useAuth } from "../../context/AuthContext"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    console.log("Dd")
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } 
    catch {
      setError("Failed to create an account")
    }
    
    setLoading(false)
  }

  return (
    <React.Fragment>
      <div>
        <h1>Sign Up</h1>
        {error}
        <form onSubmit={handleSubmit}>
          <label>Email <input ref={emailRef} id="email" type='email' /></label>
          <label>Password <input ref={passwordRef} id="password" type='password' /></label>
          <label>Confirm Password <input ref={passwordConfirmRef} id="password-confirm" type='password' /></label>
          <button disabled={loading} type='submit'>Sign Up</button>
        </form>
      </div>
      <div>
        <h2>Already have an account? Log In</h2>
      </div>
    </React.Fragment>
  )
}
