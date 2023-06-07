import React, { useState, useEffect } from "react"
import axios from "axios"
import {
	AppBar,
	Toolbar,
	IconButton,
	Drawer,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Box,
} from "@mui/material"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CloseIcon from "@mui/icons-material/Close"
import Search from "./Search"

function Navbar() {
	const [isMobile, setIsMobile] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [allCategories, setAllCategories] = useState(null)

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}

	useEffect(() => {
		getAllCategories()
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 600)
		}

		window.addEventListener("resize", handleResize)
		handleResize()

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const getAllCategories = () => {
		axios
			.get("http://localhost:9000/categories")
			.then((res) => setAllCategories(res.data.results))
	}

	console.log(allCategories)

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
							<MenuIcon fontSize="large" />
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
						<Search />
						<IconButton
							aria-label="cart"
							component={Link}
							to="/cart"
						>
							<ShoppingCartIcon fontSize="large" />
						</IconButton>
					</Box>
					<Drawer
						open={isDrawerOpen}
						onClick={toggleDrawer}
						anchor="left"
					>
						<Box
							sx={{ display: "flex", justifyContent: "flex-end" }}
						>
							<IconButton onClick={toggleDrawer}>
								<CloseIcon fontSize="large" />
							</IconButton>
						</Box>
						<Typography
							variant="h3"
							sx={{
								ml: "5%",
                                mb: '2%',
								fontSize: "calc(28px + 0.3vw)",
								textAlign: "left",
							}}
						>
							Search By Category
						</Typography>
						<List disablePadding sx={{ width: { xs: "90vw", sm: "400px" } }}>
							{allCategories &&
								allCategories.map((category) => {
									return (
										<ListItem key={category.raw} sx={{ py: '0' }}>
											<ListItemButton
												component={Link}
												to={`/search-results/${category.raw}`}
											>
												<ListItemText
													primary={category.formatted}
                                                    primaryTypographyProps={{ fontSize: 'calc(16px + 0.3vw)'}}
												/>
											</ListItemButton>
										</ListItem>
									)
								})}
						</List>
					</Drawer>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Navbar
