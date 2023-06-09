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
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { useCookies } from "react-cookie";
import TotalAndCheckout from "./TotalAndCheckout";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

function Cart() {
	const [cart, setCart] = useState([1, 2, 4]);
	const [cartItems, setCartItems] = useState([]);
	const [recItems, setRecItems] = useState([]);
	const [removeItemId, setRemoveItemId] = useState(null);
	const [confirmationOpen, setConfirmationOpen] = useState(false);

	const {
		testProducts,
		setTestProducts,
		prodColors,
		setProdColors,
		prodSize,
		setProdSize,
	} = useContext(CartContext);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const totalPrice = cartItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		setTotalPrice(totalPrice);
		console.log("COLORS", prodColors);
		console.log("Sizes", prodSize);
	}, [cartItems, testProducts]);

	useEffect(() => {
		console.log("fetching");
		fetchItems();
		console.log("Test Products", testProducts);
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
			const existingItem = items.find((item) => item.id === data.id);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				items.push({ ...data, quantity: 1 });
			}
		}

		setCartItems(items);
	};

	const handleRemoveItem = (productId) => {
		setRemoveItemId(productId);
		setConfirmationOpen(true);
	};

	const removeFromCart = () => {
		const updatedCartItems = cartItems.filter(
			(item) => item.id !== removeItemId
		);
		setCartItems(updatedCartItems);

		const updatedTestProducts = testProducts.filter(
			(productId) => productId !== removeItemId
		);
		setTestProducts(updatedTestProducts);

		const updatedProdColors = prodColors.filter(
			(_, index) => index !== testProducts.indexOf(removeItemId)
		);
		setProdColors(updatedProdColors);

		const updatedRecItems = [...recItems];
		const removedItem = updatedRecItems.find(
			(item) => item.id === removeItemId
		);
		if (removedItem) {
			removedItem.quantity = 1;
		}
		setRecItems(updatedRecItems);

		setConfirmationOpen(false);
		setRemoveItemId(null);
	};

	const addToCart = (itemID) => {
		const existingItem = cartItems.find((item) => item.id === itemID);

		if (existingItem) {
			const updatedCartItems = cartItems.map((item) => {
				if (item.id === itemID) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			setCartItems(updatedCartItems);
		} else {
			const newItem = recItems.find((item) => item.id === itemID);
			const updatedCartItems = [...cartItems, { ...newItem, quantity: 1 }];
			setCartItems(updatedCartItems);
			setTestProducts([...testProducts, itemID]);
			setProdColors([...prodColors, "default"]);
		}
	};

	/*
	const decrementQuantity = (itemID) => {
		const updatedCartItems = cartItems.map((item) => {
			if (item.id === itemID && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		setCartItems(updatedCartItems);
	};

	const incrementQuantity = (itemID) => {
		const updatedCartItems = cartItems.map((item) => {
			if (item.id === itemID) {
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		setCartItems(updatedCartItems);
	};
	*/
	const decrementQuantity = (itemID, index) => {
		const updatedProdColors = [...prodColors];
		updatedProdColors.splice(index, 1);
		setProdColors(updatedProdColors);

		const updatedCartItems = cartItems.map((item) => {
			if (item.id === itemID && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});

		const itemIndex = testProducts.indexOf(itemID);
		if (itemIndex > -1) {
			const updatedTestProducts = [
				...testProducts.slice(0, itemIndex),
				...testProducts.slice(itemIndex + 1),
			];
			setTestProducts(updatedTestProducts);
		}

		setCartItems(updatedCartItems);
	};

	const incrementQuantity = (itemID, index) => {
		const valueAtIndex = prodColors[index];
		const updatedProdColors = [...prodColors, valueAtIndex];
		setProdColors(updatedProdColors);
		const updatedProdSize = [...prodSize, valueAtIndex];
		setProdSize(updatedProdSize);

		const updatedCartItems = cartItems.map((item) => {
			if (item.id === itemID) {
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});

		const updatedTestProducts = [...testProducts, itemID];

		setCartItems(updatedCartItems);
		setTestProducts(updatedTestProducts);
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
			return !cartItems.some((cartItem) => cartItem.title === item.title);
		});

		setRecItems(items2);
	};

	useEffect(() => {
		const categories = cartItems.map((item) => item.category);
		const categoryCounts = {};

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
				<div>
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
										<Typography variant="body2">
											<Typography variant="body2">
												Color: {prodColors[index + item.quantity - 1]}
											</Typography>
											<Typography variant="body2">
												Size: {prodSize[index + item.quantity - 1] || "default"}
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
													disabled={item.quantity === 1}
													onClick={() => decrementQuantity(item.id, index)}
													style={{
														color: "black",
														backgroundColor: "white",
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
													onClick={() => incrementQuantity(item.id, index)}
													style={{
														color: "black",
														backgroundColor: "white",
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
								<Typography variant="h4" padding="20px">
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
					<Button onClick={handleCloseConfirmation} variant="contained">
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
	);
}

export default Cart;

/*
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
	const [cookies, setCookie, removeCookie] = useCookies(["cart"]);

	const { testProducts, setTestProducts } = useContext(CartContext);

	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		if (cookies.cart) {
			// Fetch cart from cookies if it exists
			setCart(cookies.cart);
			setTestProducts(cookies.cart);
		} else {
			setCookie("cart", []);
		}
	}, []);

	useEffect(() => {
		// Update the cart cookie whenever the cart changes
		setCookie("cart", testProducts);
	}, [testProducts]);

	useEffect(() => {
		setCart(cookies["cart"])
		fetchItems(cookies["cart"])
	}, [cookies["cart"]])
	useEffect(() => {
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

	const fetchMore = async (categoryName) => {
		const response = await fetch(
			`https://dummyjson.com/products/category/${categoryName}`
		);
		const data = await response.json();
		const items2 = data.products.filter((item) => {
			// Check if the item title is already in the cartItems
			return !cartItems.some((cartItem) => cartItem.title === item.title);
		});

		console.log("tried to fetch");
		setRecItems(items2);
	};

	useEffect(() => {
		const categories = cartItems.map((item) => item.category);
		const categoryCounts = {};

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

export default Cart;
*/
