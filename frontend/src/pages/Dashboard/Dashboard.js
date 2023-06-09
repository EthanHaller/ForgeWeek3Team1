import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import "./Dashboard.css"
import { Link, useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"

export default function Dashboard() {
	const [error, setError] = useState("")
	const [previousOrders, setPreviousOrders] = useState()
	const { currentUser, logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		fetchPreviousOrders()
	}, [])
	const fetchPreviousOrders = async () => {
		axios
			.get(`http://localhost:9000/previous-orders/${currentUser.uid}`)
			.then((res) => setPreviousOrders(res.data))
	}
	console.log(previousOrders)

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
			<div className="container">
				<h1>Profile</h1>
				<h4>{error}</h4>
				<strong>Email:</strong> {currentUser.email}
				{/* <Link to="/update-profile"><button>Update Profile</button></Link> */}
				<div>
					<button onClick={handleLogout}>Log Out</button>
				</div>
			</div>
			{previousOrders && (
				<Box sx={{ mt: "100px" }}>
					<Typography variant="h2">Previous Orders</Typography>
				</Box>
			)}
		</React.Fragment>
	)
}

function secondsToDate(secs) {
	const t = new Date(1970, 0, 1) // Epoch
	t.setSeconds(secs)
	return t
}
