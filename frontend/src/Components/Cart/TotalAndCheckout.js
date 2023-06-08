import { Box, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import CartContext from "./CartContext";

function TotalAndCheckout({ price }) {
	const { testProducts, setTestProducts } = useContext(CartContext);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		fetchItems();
	}, [testProducts]);

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

	const handleCheckout = (e) => {
		fetchItems();
		e.preventDefault();

		axios
			.post("http://localhost:9000/checkout", { items: cartItems })
			.then((res) => (window.location.href = res.data));
	};

	return (
		<>
			<Box
				sx={{ width: "100%", display: "flex", justifyContent: "space-between", mt: '25px', mb: '20px' }}
			>
                <Typography variant='h3'>{`Total: $${price}`}</Typography>
				<Button
					onClick={handleCheckout}
					variant="contained"
					sx={{ width: "calc(100px + 6vw)" }}
				>
					CHECK OUT
				</Button>
			</Box>
            <Divider sx={{ mb: '80px'}}/>
		</>
	);
}

export default TotalAndCheckout;