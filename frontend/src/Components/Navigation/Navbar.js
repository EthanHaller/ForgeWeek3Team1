import React, { useState, useEffect } from "react"
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Search from "./Search"
import CategoriesDrawer from "./CategoriesDrawer"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import logo from './logo-no-background.png';

function Navbar() {
	const [isMobile, setIsMobile] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 600)
		}

		window.addEventListener("resize", handleResize)
		handleResize()

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<>
			<AppBar position="fixed">
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Box
						sx={{
							width: "30vw",
							display: "flex",
							justifyContent: "flex-start",
						}}
					>
						<IconButton aria-label="menu" onClick={toggleDrawer}>
							<MenuIcon
								fontSize={isMobile ? "medium" : "large"}
							/>
						</IconButton>
					</Box>
					<Box
						sx={{
							width: "30vw",
							display: "flex",
							justifyContent: "center",
						}}
					>

						<Link to="/">
							<img src={logo} alt="logo" style={{width: "70px", height: "70px", marginRight: "20px", marginTop:"10px"}}/>
						</Link>
	
					</Box>
					<Box
						sx={{
							width: "30vw",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Search isMobile={isMobile} />
						<IconButton
							aria-label="cart"
							component={Link}
							to="/cart"
						>
							<ShoppingCartIcon
								fontSize={isMobile ? "medium" : "large"}
							/>
						</IconButton>
						<IconButton component={Link} to="/dashboard">
							<AccountCircleIcon
								fontSize={isMobile ? "medium" : "large"}
							/>
						</IconButton>
					</Box>
					<CategoriesDrawer
						toggleDrawer={toggleDrawer}
						isDrawerOpen={isDrawerOpen}
					/>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Navbar
