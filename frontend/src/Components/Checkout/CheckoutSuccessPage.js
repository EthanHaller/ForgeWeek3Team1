import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import check from "./check.png"
import { useAuth } from "../../context/AuthContext"

function CheckoutSuccessPage() {
	const [params] = useSearchParams()
	const sessionID = params.get("session_id")
	const [name, setName] = useState("")
	const { currentUser } = useAuth()

	useEffect(() => {
		getCheckoutInfo()
	}, [sessionID])

	const getCheckoutInfo = () => {
		axios
			.get(
				`https://easybuy-7xer.onrender.com/checkout/order/success?session_id=${sessionID}`,
				{
					query: sessionID,
				}
			)
			.then((res) => {
				console.log(res.data)
				setName(res.data.results)
				if (currentUser) {
					axios.post("https://easybuy-7xer.onrender.com/previous-orders/add", {
						sessionId: sessionID,
						data: res.data,
						user: currentUser.uid,
					})
				}
			})
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<img
				src={check}
				alt=""
				style={{
					width: "calc(200px + 1vw)",
					paddingTop: "25px",
					paddingBottom: "50px",
				}}
			/>
			<Typography
				variant="h2"
				sx={{ fontSize: "calc(48px + 1vw)", pb: "25px" }}
			>
				Thank You
			</Typography>
			{name && <Typography
				variant="body1"
				textAlign="center"
				sx={{ fontSize: "calc(18px + 1vw)", mx: '10vw', mb: '50px' }}
			>
				{currentUser
					? `${name}, your order has been confirmed! You can view this order on your account dashboard.`
					: `${name}, your order has been confirmed!`}
			</Typography>}
		</Box>
	)
}

export default CheckoutSuccessPage