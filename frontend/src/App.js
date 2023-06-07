import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navigation/Navbar"
import Test from "./Components/Test/Test"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./Theme"
import SearchResultsPage from "./pages/searchResults/searchResultsPage"
import HomePage from "./Components/HomePage/HomePage";


function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/products/:category" element={<SearchResultsPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
