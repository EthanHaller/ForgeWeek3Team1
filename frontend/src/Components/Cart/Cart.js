import React, { useState, useEffect, useContext } from "react";
import CartContext from "./CartContext";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
	Card,
	CardContent,
	Typography,
	Box,
	Container,
	Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCookies } from "react-cookie";
import TotalAndCheckout from "./TotalAndCheckout";

function Cart() {
	const [cart, setCart] = useState([1, 2, 4]);
	const [cartItems, setCartItems] = useState([]);
	const [recItems, setRecItems] = useState([]);
	const [removeItemId, setRemoveItemId] = useState(null);
	const [confirmationOpen, setConfirmationOpen] = useState(false);
	//const [cookies, setCookie, removeCookie] = useCookies(["cart"]);

	const { testProducts, setTestProducts } = useContext(CartContext);
	//const [testProducts, setTestProducts] = useState([1, 2, 3, 4])

	//i just commented this out but it doesn't seem to work for me?
	/*
	useEffect(() => {
		if (cookies.cart) {
			setCart(JSON.parse(cookies.cart));
		}
	}, []);
	*/

	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		// Calculate total price whenever cartItems change
		const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
		setTotalPrice(totalPrice);
	}, [cartItems, testProducts]);

	useEffect(() => {
		//setCookie("cart", JSON.stringify(cart), { path: "/" });
		fetchItems();
		console.log(testProducts);

		console.log("Recommended Items: ", recItems);

		console.log(cart);
	}, [cart, testProducts]);

	const fetchItems = async () => {
		const items = [];

		for (const productId of testProducts) {
			const response = await fetch(
				`https://dummyjson.com/products/${productId}`
			);
			const data = await response.json();
			items.push(data);
		}

		setCartItems(items);
	};

	const handleRemoveItem = (productId) => {
		setRemoveItemId(productId);
		setConfirmationOpen(true);
	};

	const removeFromCart = () => {
		const updatedCart = [...testProducts];
		const index = updatedCart.indexOf(removeItemId);

		if (index > -1) {
			updatedCart.splice(index, 1);
			setCart(updatedCart);
			setTestProducts(updatedCart);
		}

		setConfirmationOpen(false);
		setRemoveItemId(null);
	};

	const addToCart = (itemID) => {
		const updatedCart = [...testProducts, itemID];
		setTestProducts(updatedCart);
	};

	const handleCloseConfirmation = () => {
		setConfirmationOpen(false);
		setRemoveItemId(null);
	};

	const fetchMore = async (categoryName) => {
		const response = await fetch(
			`https://dummyjson.com/products/category/${categoryName}`
		);
		const data = await response.json();
		const items2 = data.products.filter((item) => {
			// Check if the item title is already in the cartItems
			return !cartItems.some((cartItem) => cartItem.title === item.title);
		});

		setRecItems(items2);
	};

	useEffect(() => {
		const categories = cartItems.map((item) => item.category);
		const categoryCounts = {};

		// Count the occurrences of each category
		for (const category of categories) {
			categoryCounts[category] = (categoryCounts[category] || 0) + 1;
		}

		const maxCount = Math.max(...Object.values(categoryCounts));
		const mostFrequentCategory = Object.keys(categoryCounts).find(
			(category) => categoryCounts[category] === maxCount
		);

		console.log("Most frequent category:", mostFrequentCategory);
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
				<Typography variant="body1">Cart is empty</Typography>
			) : (
				<div>
					<Container style={{ width: "75%", margin: "0 auto" }}>
						<Box display="flex" flexDirection="column" alignItems="center">
							{cartItems.map((item, index) => (
								<Card
									key={`${item.id}-${index}`}
									style={{
										marginBottom: "1rem",
										width: "100%",
									}}
								>
									<CardContent>
										<Typography variant="h6">{item.title}</Typography>
										<Typography variant="body2">${item.price}.00</Typography>
										<Typography variant="body2">{item.description}</Typography>
										<Box display="flex" justifyContent="flex-end">
											<Box display="flex" justifyContent="flex-end">
												<IconButton
													onClick={() => handleRemoveItem(item.id)}
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
					</Container>

					<br></br>

					<Box>
						<Grid
							container
							spacing={8}
							alignItems="right"
							justifyContent="right"
							width={"90%"}
						>
							<Grid item>
								<Typography variant="h4">
									Total: ${totalPrice.toFixed(2)}
								</Typography>
							</Grid>
							<Grid item>
								<TotalAndCheckout />
							</Grid>
						</Grid>
					</Box>
					<br></br>
					<br></br>
					<Typography
						fontSize="40px"
						variant="h6"
						align="center"
						sx={{ padding: "0px" }}
					>
						Recommended Items
					</Typography>

					<Container style={{ width: "75%", margin: "0 auto" }}>
						<Box display="flex" flexDirection="column" alignItems="center">
							{recItems.map((item2, index) => (
								<Card
									key={`${item2.id}-${index}`}
									style={{
										marginBottom: "1rem",
										width: "100%",
									}}
								>
									<CardContent>
										<Typography variant="h6">{item2.title}</Typography>
										<Typography variant="body2">${item2.price}.00</Typography>
										<Typography variant="body2">{item2.description}</Typography>
										<Box display="flex" justifyContent="flex-end">
											<Box display="flex" justifyContent="flex-end">
												<IconButton
													style={{
														color: "white",
														backgroundColor: "green",
													}}
													sx={{
														borderRadius: "4px",
													}}
													size="small"
													onClick={() => addToCart(item2.id)}
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
					<Button onClick={handleCloseConfirmation}>Keep in Cart</Button>
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
	);
}

export default Cart;
