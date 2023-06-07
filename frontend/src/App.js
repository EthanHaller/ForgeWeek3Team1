mport React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navigation/Navbar";
import SearchResultsPage from "./pages/searchResults/searchResultsPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import HomePage from "./Components/HomePage/HomePage";
import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import CartContext from "./Components/Cart/CartContext";
import CheckoutSuccessPage from "./Components/Checkout/CheckoutSuccessPage"
import ItemPage from "./pages/ItemPage/ItemPage"

function App() {
	const [testProducts, setTestProducts] = useState([11, 23]);

	return (
		<CartContext.Provider value={{ testProducts, setTestProducts }}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/products/:category" element={<SearchResultsPage />} />
						<Route path="/cart" element={<Cart />} />
						<Route path='/order/success' element={<CheckoutSuccessPage />} />
						<Route path="/products/:category/:id" element={<ItemPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</CartContext.Provider>
	);
}

export default App;
