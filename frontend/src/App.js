import React from "react";
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
import CheckoutSuccessPage from "./Components/Checkout/CheckoutSuccessPage";
import ItemPage from "./pages/ItemPage/ItemPage";
import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Footer from "./Components/Footer/Footer";

function App() {
	const [testProducts, setTestProducts] = useState([]);
	const [prodColors, setProdColors] = useState([]);
	const [prodSize, setProdSize] = useState([]);

	return (
		<AuthProvider>
			<CartContext.Provider
				value={{
					testProducts,
					setTestProducts,
					prodColors,
					setProdColors,
					prodSize,
					setProdSize,
				}}
			>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Navbar />

						<div style={{ paddingTop: "88px" }}>
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route
									path="/products/:category"
									element={<SearchResultsPage />}
								/>
								<Route path="/cart" element={<Cart />} />
								<Route
									path="/order/success"
									element={<CheckoutSuccessPage />}
								/>
								<Route path="/products/:category/:id" element={<ItemPage />} />
								<Route path="/signup" element={<Signup />} />
								<Route path="/login" element={<Login />} />
								<Route
									path="/dashboard"
									element={
										<PrivateRoute>
											<Dashboard />
										</PrivateRoute>
									}
								/>
							</Routes>
						</div>
						<Footer />
					</BrowserRouter>
				</ThemeProvider>
			</CartContext.Provider>
		</AuthProvider>
	);
}

export default App;
