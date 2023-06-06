import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navigation/Navbar"
import Test from "./Components/Test/Test"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./Theme"

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Test />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
