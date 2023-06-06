import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navigation/Navbar"
import Test from "./components/Test/Test"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./Theme"
import Signup from "./pages/Signup/Signup"
import { AuthProvider } from "./context/AuthContext"
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import PrivateRoute from "./PrivateRoute"

function App() {
	return (
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Navbar />
					<AuthProvider>
						<Routes>
							<Route path="/" element={<Test />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/login" element={<Login />} />
							<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
						</Routes>
					</AuthProvider>
				</BrowserRouter>
			</ThemeProvider>
	)
}

export default App
