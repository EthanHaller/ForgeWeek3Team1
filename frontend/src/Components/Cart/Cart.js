import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import CartContext from "./CartContext"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import { Card, CardContent, Typography, Box, Container } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { useCookies } from "react-cookie"
import TotalAndCheckout from "./TotalAndCheckout"

function Cart() {
	const [cart, setCart] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [recItems, setRecItems] = useState([])
	const [removeItemId, setRemoveItemId] = useState(null)
	const [confirmationOpen, setConfirmationOpen] = useState(false)
	const [cookies, setCookie, removeCookie] = useCookies()

	const { testProducts } = useContext(CartContext)

	useEffect(() => {
		setCart(cookies["cart"])
		fetchItems(cookies["cart"])
	}, [cookies["cart"]])
	useEffect(() => {
		getRecommendedItems(cartItems)
	}, [cartItems])

	const fetchItems = async (ids) => {
		if (ids.length === 0) return
		Promise.all(ids.map((id) => fetchItem(id))).then((values) =>
			setCartItems(values)
		)
	}
	const fetchItem = async (id) => {
		const res = await axios.get(
			`http://localhost:9000/products/get-product/${id}`
		)
		return res.data
	}

	const handleRemoveItem = (productId) => {
		setRemoveItemId(productId)
		setConfirmationOpen(true)
	}

	const removeFromCart = () => {
		const updatedCart = [...cart]
		const index = updatedCart.indexOf(removeItemId)

		if (index > -1) {
			updatedCart.splice(index, 1)
			setCookie("cart", updatedCart)
		}

		setConfirmationOpen(false)
		setRemoveItemId(null)
	}

	const addToCart = (itemID) => {
		setCookie('cart',[...cart, itemID])
	}

	const handleCloseConfirmation = () => {
		setConfirmationOpen(false)
		setRemoveItemId(null)
	}

	const getRecommendedItems = (items) => {
		//used to get recommended items
		console.log(cartItems)
		const categories = items.map((item) => item.category)
		const categoryCounts = {}

		// Count the occurrences of each category
		for (const category of categories) {
			categoryCounts[category] = (categoryCounts[category] || 0) + 1
		}

		const maxCount = Math.max(...Object.values(categoryCounts))
		const mostFrequentCategory = Object.keys(categoryCounts).find(
			(category) => categoryCounts[category] === maxCount
		)

		fetchRecommendedItems(mostFrequentCategory)
	}
	const fetchRecommendedItems = async (categoryName) => {
		let items;
		await fetch("http://localhost:9000/products/get-products", {
			method: "put",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ category: "category/" + categoryName })
		})
		.then(res => res.json())
		.then(data => {
			items = data.results.filter((item) => {
				// Check if the item title is already in the cartItems
				return !cartItems.some((cartItem) => cartItem.title === item.title)
			})
		})

		setRecItems(items)
	}

	const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0)

	return (
		<div>
			<Box
				textAlign="center"
				sx={{
					padding: "0px",
					backgroundColor: "#FFF8DE",
					height: "80px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography
					variant="h6"
					align="center"
					sx={{ padding: "0px", fontSize: "calc(32px + 0.5vw)" }}
				>
					My Cart
				</Typography>
			</Box>

			{cartItems.length === 0 ? (
				<Typography variant="body1">Cart is empty</Typography>
			) : (
				<div>
					<Container style={{ width: "75%", margin: "0 auto" }}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
							{cartItems.map((item, index) => (
								<Card
									key={`${item.id}-${index}`}
									style={{
										marginBottom: "1rem",
										width: "100%",
									}}
								>
									<CardContent>
										<Typography variant="h6">
											{item.title}
										</Typography>
										<Typography variant="body2">
											${item.price}.00
										</Typography>
										<Typography variant="body2">
											{item.description}
										</Typography>
										<Box
											display="flex"
											justifyContent="flex-end"
										>
											<Box
												display="flex"
												justifyContent="flex-end"
											>
												<IconButton
													onClick={() =>
														handleRemoveItem(
															item.id
														)
													}
													style={{
														color: "white",
														backgroundColor: "red",
													}}
													sx={{
														borderRadius: "4px",
													}}
													size="small"
												>
													<DeleteIcon />
												</IconButton>
											</Box>
										</Box>
									</CardContent>
								</Card>
							))}
						</Box>
						<TotalAndCheckout cartItems={cartItems} price={totalPrice.toFixed(2)} />
					</Container>

					<Typography
						variant="h6"
						align="center"
						sx={{ padding: "0px", fontSize: "calc(32px + 0.5vw)" }}
					>
						Recommended Items
					</Typography>

					<Container style={{ width: "75%", margin: "0 auto" }}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
							{recItems.map((item2, index) => (
								<Card
									key={`${item2.id}-${index}`}
									style={{
										marginBottom: "1rem",
										width: "100%",
									}}
								>
									<CardContent>
										<Typography variant="h6">
											{item2.title}
										</Typography>
										<Typography variant="body2">
											${item2.price}.00
										</Typography>
										<Typography variant="body2">
											{item2.description}
										</Typography>
										<Box
											display="flex"
											justifyContent="flex-end"
										>
											<Box
												display="flex"
												justifyContent="flex-end"
											>
												<IconButton
													style={{
														color: "white",
														backgroundColor:
															"green",
													}}
													sx={{
														borderRadius: "4px",
													}}
													size="small"
													onClick={() =>
														addToCart(item2.id)
													}
												>
													<AddShoppingCartIcon />
												</IconButton>
											</Box>
										</Box>
									</CardContent>
								</Card>
							))}
						</Box>
					</Container>
				</div>
			)}

			<Dialog
				open={confirmationOpen}
				onClose={handleCloseConfirmation}
				aria-labelledby="confirm-dialog-title"
			>
				<DialogTitle id="confirm-dialog-title">
					Are you sure you want to remove this item from your cart?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseConfirmation}>
						Keep in Cart
					</Button>
					<Button
						onClick={removeFromCart}
						variant="contained"
						style={{ backgroundColor: "red" }}
					>
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Cart
