import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import "./Dashboard.css"
import { useNavigate } from "react-router-dom"
import { Box, Paper, Typography } from "@mui/material"

export default function Dashboard() {
	const [error, setError] = useState("")
	const [previousOrders, setPreviousOrders] = useState()
	const [previousOrdersDisplay, setPreviousOrdersDisplay] = useState(false)
	const { currentUser, logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		fetchPreviousOrders()
	}, [])
	const fetchPreviousOrders = async () => {
		axios
			.get(`https://easybuy-7xer.onrender.com/previous-orders/${currentUser.uid}`)
			.then((res) => setPreviousOrders(res.data))
	}
	useEffect(() => {
		getPreviousOrdersDisplay()
	}, [previousOrders])

	async function handleLogout() {
		setError("")

		try {
			await logout()
			navigate("/login")
		} catch {
			setError("Failed to log out")
		}
	}

	const getPreviousOrdersDisplay = async () => {
		if (!previousOrders) return

		const result = await Promise.all(
			previousOrders.results.map(async (order) => {
				const orderItemsDisplay = []

				let totalPrice = 0

				await Promise.all(
					order.items.map(async (item) => {
						try {
							const response = await axios.get(
								`https://easybuy-7xer.onrender.com/products/get-product/${item.itemId}`
							)
							totalPrice += response.data.price * item.quantity
							orderItemsDisplay.push(
								<Typography variant="body2" pl="20px">
									{response.data.title +
										" ($" +
										response.data.price +
										"); Quantity: " +
										item.quantity}
								</Typography>
							)
						} catch (error) {
							console.error(error)
						}
					})
				)

				return (
					<>
						<Paper square sx={{ my: "25px", p: "40px" }}>
							<Typography variant="h6" textAlign="left">
								{"Order Date:"}
							</Typography>
							<Typography variant="body1" pl="20px">
								{"" + secondsToDate(order.time.seconds)}
							</Typography>
							<Typography variant="h6" textAlign="left">
								{"Order ID:"}
							</Typography>
							<Typography
								variant="body1"
								pl="20px"
								sx={{ wordWrap: "break-word" }}
							>
								{"" + order.session}
							</Typography>
							<Typography variant="h6" textAlign="left">
								{"Items:"}
							</Typography>
							{orderItemsDisplay}
							<Typography variant="h6" textAlign="right">
								{"Total: $" + totalPrice}
							</Typography>
						</Paper>
					</>
				)
			})
		)

		setPreviousOrdersDisplay(result.reverse())
	}

	return (
		<React.Fragment>
			<div className="container">
				<h1>Profile</h1>
				<h4>{error}</h4>
				<strong>Email:</strong> {currentUser.email}
				<div>
					<button onClick={handleLogout}>Log Out</button>
				</div>
			</div>
			{previousOrders && previousOrdersDisplay.length > 0 && (
				<Box
					sx={{
						m: "25px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box sx={{ mt: "100px", width: "80%" }}>
						<Typography
							variant="h2"
							sx={{ fontSize: "calc(32px + 1vw)", pb: "20px" }}
						>
							Previous Orders
						</Typography>
						{previousOrdersDisplay}
					</Box>
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
