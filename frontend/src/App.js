import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navigation/Navbar"
import Test from "./Components/Test/Test"
import SearchResultsPage from './pages/searchResults/searchResultsPage'
import { ThemeProvider } from "@mui/material/styles"
import theme from "./Theme"

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Test />} />
					<Route path="/products/:category" element={<SearchResultsPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
