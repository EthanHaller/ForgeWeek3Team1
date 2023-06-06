import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navigation/Navbar"
import Test from "./components/Test/Test"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./Theme"
import Signup from "./pages/Signup/Signup"
import { AuthProvider } from "./context/AuthContext"

function App() {
	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<Test />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</AuthProvider>
	)
}

export default App
