import React, { useState, useEffect } from "react"
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Search from "./Search"
import CategoriesDrawer from "./CategoriesDrawer"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuth } from "../../context/AuthContext"

function Navbar() {
	const [isMobile, setIsMobile] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const { currentUser } = useAuth()

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
			<AppBar position="relative">
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
						<Typography
							sx={{
								textDecoration: "none",
								color: "black",
								fontSize: "calc(24px + 1vw)",
							}}
							variant="h1"
							component={Link}
							to="/"
						>
							EasyBuy
						</Typography>
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
							{currentUser ? (
								<LogoutIcon
									fontSize={isMobile ? "medium" : "large"}
								/>
							) : (
								<LoginIcon
									fontSize={isMobile ? "medium" : "large"}
								/>
							)}
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
