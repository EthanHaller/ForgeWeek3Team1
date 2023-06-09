import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	IconButton,
	Typography,
} from "@mui/material"
import axios from "axios"
import { useContext, useState, useEffect } from "react"
import CartContext from "./CartContext"
import CloseIcon from "@mui/icons-material/Close"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"

function TotalAndCheckout({ cartItems, price }) {
	const { testProducts, setTestProducts } = useContext(CartContext)
	// const [cartItems, setCartItems] = useState([])
	const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
	const { currentUser } = useAuth()
	// console.log("current user: ",currentUser)

	// useEffect(() => {
	// 	fetchItems()
	// }, [testProducts])

	// const fetchItems = async () => {
	// 	const items = []
	// 	for (const productId of testProducts) {
	// 		const response = await fetch(
	// 			`https://dummyjson.com/products/${productId}`
	// 		)
	// 		const data = await response.json()
	// 		items.push(data)
	// 	}

function TotalAndCheckout() {
	const { testProducts, setTestProducts } = useContext(CartContext);
	const [cartItems, setCartItems] = useState([]);

	const attemptCheckout = (e) => {
		e.preventDefault()

		if(currentUser) handleCheckout()
		else setShowCheckoutDialog(true)
	}

	const handleCheckout = (e) => {
		console.log("test")
		setShowCheckoutDialog(false)

		axios
			.post("http://localhost:9000/checkout", { items: cartItems })
			.then((res) => (window.location.href = res.data))
	}

	return (
		<>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					mt: "25px",
					mb: "20px",
				}}
			>
				<Button
					onClick={attemptCheckout}
					variant="contained"
					sx={{ width: "calc(100px + 6vw)" }}
				>
					CHECK OUT
				</Button>
			</Box>
			<Divider sx={{ mb: "80px" }} />
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
				<Typography variant="body1" sx={{ p: '25px' }}>
					Log in to add this order to your past orders, or continue as a guest.
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-around', mb: '25px' }}>
					<Button component={Link} to='/login' variant='contained' sx={{ width: '40%' }}>Login</Button>
					<Button onClick={() => handleCheckout()} variant='contained' sx={{ width: '40%' }}>Continue as guest</Button>
				</Box>
			</Dialog>
		</>
	)
}

export default TotalAndCheckout
