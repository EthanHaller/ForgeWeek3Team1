import React, { useState, useEffect, useContext } from "react";
import CartContext from "./CartContext";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./Cart.css"
import {
	Card,
	CardContent,
	CardActionArea,
	CardMedia,
	Typography,
	Box,
	Container,
	Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import TotalAndCheckout from "./TotalAndCheckout";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Link } from "react-router-dom";

function Cart() {
	const [cart, setCart] = useState([1, 2, 4])
	const [cartItems, setCartItems] = useState([])
	const [recItems, setRecItems] = useState([])
	const [removeItemId, setRemoveItemId] = useState(null)
	const [confirmationOpen, setConfirmationOpen] = useState(false)

	const {
		testProducts,
		setTestProducts,
		prodColors,
		setProdColors,
		prodSize,
		setProdSize,
	} = useContext(CartContext)
	const [totalPrice, setTotalPrice] = useState(0)

	useEffect(() => {
		const totalPrice = cartItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		setTotalPrice(totalPrice);
	}, [cartItems, testProducts]);

	useEffect(() => {
		fetchItems();
	}, [cart, testProducts]);

	const fetchItems = async () => {
		const items = []

		for (const productId of testProducts) {
			const response = await fetch(
				`https://dummyjson.com/products/${productId}`
			)
			const data = await response.json()
			const existingItem = items.find((item) => item.id === data.id)
			if (existingItem) {
				existingItem.quantity += 1
			} else {
				items.push({ ...data, quantity: 1 })
			}
		}

		setCartItems(items)
	}

	const handleRemoveItem = (productId) => {
		setRemoveItemId(productId)
		setConfirmationOpen(true)
	}

	const removeFromCart = () => {
		const updatedCartItems = cartItems.filter(
			(item) => item.id !== removeItemId
		)
		setCartItems(updatedCartItems)

		const updatedTestProducts = testProducts.filter(
			(productId) => productId !== removeItemId
		)
		setTestProducts(updatedTestProducts)

		const updatedProdColors = prodColors.filter(
			(_, index) => index !== testProducts.indexOf(removeItemId)
		)
		setProdColors(updatedProdColors)

		const updatedRecItems = [...recItems]
		const removedItem = updatedRecItems.find(
			(item) => item.id === removeItemId
		)
		if (removedItem) {
			removedItem.quantity = 1
		}
		setRecItems(updatedRecItems)

		setConfirmationOpen(false)
		setRemoveItemId(null)
	}

	const addToCart = (itemID) => {
		const existingItem = cartItems.find((item) => item.id === itemID)

		if (existingItem) {
			const updatedCartItems = cartItems.map((item) => {
				if (item.id === itemID) {
					return { ...item, quantity: item.quantity + 1 }
				}
				return item
			})
			setCartItems(updatedCartItems)
		} else {
			const newItem = recItems.find((item) => item.id === itemID)
			const updatedCartItems = [...cartItems, { ...newItem, quantity: 1 }]
			setCartItems(updatedCartItems)
			setTestProducts([...testProducts, itemID])
			setProdColors([...prodColors, "default"])
		}
	}
	
	const decrementQuantity = (itemID, index) => {
		const updatedProdColors = [...prodColors]
		updatedProdColors.splice(index, 1)
		setProdColors(updatedProdColors)

		const updatedCartItems = cartItems.map((item) => {
			if (item.id === itemID && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 }
			}
			return item
		})

		const itemIndex = testProducts.indexOf(itemID)
		if (itemIndex > -1) {
			const updatedTestProducts = [
				...testProducts.slice(0, itemIndex),
				...testProducts.slice(itemIndex + 1),
			]
			setTestProducts(updatedTestProducts)
		}

		setCartItems(updatedCartItems)
	}

	const incrementQuantity = (itemID, index) => {
		const valueAtIndex = prodColors[index]
		const updatedProdColors = [...prodColors, valueAtIndex]
		setProdColors(updatedProdColors)
		const updatedProdSize = [...prodSize, valueAtIndex]
		setProdSize(updatedProdSize)

		const updatedCartItems = cartItems.map((item) => {
			if (item.id === itemID) {
				return { ...item, quantity: item.quantity + 1 }
			}
			return item
		})

		const updatedTestProducts = [...testProducts, itemID]

		setCartItems(updatedCartItems)
		setTestProducts(updatedTestProducts)
	}

	const handleCloseConfirmation = () => {
		setConfirmationOpen(false)
		setRemoveItemId(null)
	}

	const fetchMore = async (categoryName) => {
		const response = await fetch(
			`https://dummyjson.com/products/category/${categoryName}`
		)
		const data = await response.json()
		const items2 = data.products.filter((item) => {
			return !cartItems.some((cartItem) => cartItem.title === item.title)
		})

		setRecItems(items2)
	}

	useEffect(() => {
		const categories = cartItems.map((item) => item.category)
		const categoryCounts = {}

		for (const category of categories) {
			categoryCounts[category] = (categoryCounts[category] || 0) + 1
		}

		const maxCount = Math.max(...Object.values(categoryCounts))
		const mostFrequentCategory = Object.keys(categoryCounts).find(
			(category) => categoryCounts[category] === maxCount
		);
		fetchMore(mostFrequentCategory);
	}, [cartItems, testProducts]);

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
					fontSize="40px"
					variant="h6"
					align="center"
					sx={{ padding: "0px" }}
				>
					My Cart
				</Typography>
			</Box>

			{cartItems.length === 0 ? (
				<div style={{ height: "400px" }}>
					<Typography variant="h5" align="center" paddingTop={"50px"}>
						Cart is currently empty.
					</Typography>
					<Typography variant="h6" align="center" padding={"5px"}>
						Browse through our products to add some items!
					</Typography>
				</div>
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
										<Typography variant="body2">
											<Typography variant="body2">
												Color:{" "}
												{
													prodColors[
														index +
															item.quantity -
															1
													]
												}
											</Typography>
											<Typography variant="body2">
												Size:{" "}
												{prodSize[
													index + item.quantity - 1
												] || "default"}
											</Typography>
										</Typography>
										<Box
											display="flex"
											justifyContent="space-between"
											alignItems="center"
											padding="15px"
										>
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems="center"
											>
												<IconButton
													disabled={
														item.quantity === 1
													}
													onClick={() =>
														decrementQuantity(
															item.id,
															index
														)
													}
													style={{
														color: "black",
														backgroundColor:
															"white",
														marginRight: "8px",
													}}
													sx={{
														borderRadius: "4px",
													}}
													size="small"
												>
													<IndeterminateCheckBoxOutlinedIcon />
												</IconButton>
												<Typography variant="h6">
													Quantity: {item.quantity}
												</Typography>
												<IconButton
													onClick={() =>
														incrementQuantity(
															item.id,
															index
														)
													}
													style={{
														color: "black",
														backgroundColor:
															"white",
														marginLeft: "8px",
													}}
													sx={{
														borderRadius: "4px",
													}}
													size="small"
												>
													<AddBoxOutlinedIcon />
												</IconButton>
											</Box>
											<Box>
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
						<Box
							sx={{
								width: '100%',
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: '75px'
							}}
						>
							<Typography variant="h4" padding="20px">
								Total: ${totalPrice.toFixed(2)}
							</Typography>
							<TotalAndCheckout />
						</Box>
					</Container>

					<Typography
						fontSize="40px"
						variant="h6"
						align="center"
						sx={{ padding: "0px" }}
					>
						Recommended Items
					</Typography>

					<div className="recommended">
						{recItems.map((element, index) => (
							<Card
								className="recItems"
								key={`${element.id}-${index}`}
								sx={{ marginLeft: "1%" }}
								component={Link}
								to={
									"/products/" +
									element.category +
									"/" +
									element.id
								}
							>
								<CardActionArea>
									<CardMedia
										className="cardPic"
										sx={{ objectFit: "contain" }}
										component="img"
										image={element.thumbnail}
										alt="picture of product"
										height="300"
									/>
									<CardContent>
										<Typography
											gutterBottom
											variant="h5"
											component="div"
										>
											{element.title}
										</Typography>
										<Typography
											variant="body2"
											color="error"
										>
											${element.price}{" "}
											<s style={{ color: "gray" }}>
												$
												{Math.round(
													element.price * 1.25
												)}
											</s>
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						))}
					</div>
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
					<Button
						onClick={handleCloseConfirmation}
						variant="contained"
					>
						Keep in Cart
					</Button>
					<Button
						onClick={removeFromCart}
						variant="contained"
						style={{ backgroundColor: "red", color: "white" }}
					>
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Cart;