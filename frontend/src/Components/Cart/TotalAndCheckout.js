import {
	Box,
	Button,
	Dialog,
	IconButton,
	Typography,
} from "@mui/material"
import axios from "axios"
import { useContext, useState, useEffect } from "react"
import CartContext from "./CartContext"
import CloseIcon from "@mui/icons-material/Close"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"

function TotalAndCheckout() {
	const { testProducts, setTestProducts } = useContext(CartContext)
	const [cartItems, setCartItems] = useState([])
	const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
	const { currentUser } = useAuth()

	useEffect(() => {
		fetchItems()
	}, [testProducts])

	const fetchItems = async () => {
		const items = []
		for (const productId of testProducts) {
			const response = await fetch(
				`https://dummyjson.com/products/${productId}`
			)
			const data = await response.json()
			items.push(data)
		}
		setCartItems(items)
	}

	const attemptCheckout = async () => {
		fetchItems()

		if (currentUser) handleCheckout()
		else setShowCheckoutDialog(true)
	}

	const handleCheckout = () => {
		setShowCheckoutDialog(false)
		axios
			.post("https://easybuy-7xer.onrender.com/checkout", { items: cartItems })
			.then((res) => (window.location.href = res.data))
	}

	console.log(cartItems)

	return (
		<>
			<Button
				onClick={() => attemptCheckout()}
				variant="contained"
				sx={{ width: "calc(100px + 6vw)" }}
			>
				CHECK OUT
			</Button>
			<Dialog open={showCheckoutDialog} fullWidth maxWidth="sm">
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<IconButton onClick={() => setShowCheckoutDialog(false)}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Typography
					variant="h3"
					sx={{ fontSize: "calc(24px + 0.5vw)" }}
				>
					You are not logged in
				</Typography>
				<Typography variant="body1" sx={{ p: "25px" }}>
					Log in to add this order to your past orders, or continue as
					a guest.
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						mb: "25px",
					}}
				>
					<Button
						component={Link}
						to="/login"
						variant="contained"
						sx={{ width: "40%" }}
					>
						Login
					</Button>
					<Button
						onClick={() => handleCheckout()}
						variant="contained"
						sx={{ width: "40%" }}
					>
						Continue as guest
					</Button>
				</Box>
			</Dialog>
		</>
	)
}

export default TotalAndCheckout
