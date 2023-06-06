import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navigation/Navbar"
import Test from "./components/Test/Test"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./Theme"
import HomePage from "./components/HomePage/HomePage";


function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
