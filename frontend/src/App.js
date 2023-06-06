import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navigation/Navbar"
import Test from "./Components/Test/Test"

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Test />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
