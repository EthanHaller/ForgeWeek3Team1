import React, { useState } from "react"
import {
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
import Search from "./Search"

function MobileNavbar() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}
	return (
		<>
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
					AppName
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
				<IconButton aria-label="cart" component={Link} to="/cart">
					<ShoppingCartIcon fontSiz="large" />
				</IconButton>
			</Box>
			<Drawer open={isDrawerOpen} onClick={toggleDrawer} anchor="left">
				<List sx={{ width: 300 }}>
					{["Test", "Test", "Test"].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<MenuIcon />
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	)
}

export default MobileNavbar
