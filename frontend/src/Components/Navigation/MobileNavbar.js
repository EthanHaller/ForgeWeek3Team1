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

function MobileNavbar() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}
	return (
		<>
			<Box sx={{ width: '30vw', display: 'flex', justifyContent: 'flex-start' }}>
				<IconButton aria-label="menu" onClick={toggleDrawer}>
					<MenuIcon />
				</IconButton>
			</Box>
			<Box sx={{ width: '30vw', display: 'flex', justifyContent: 'center' }}>
				<Typography
					sx={{ textDecoration: "none", color: "black" }}
					variant="h2"
					component={Link}
					to="/"
				>
					AppName
				</Typography>
			</Box>
			<Box sx={{ width: '30vw', display: 'flex', justifyContent: 'flex-end' }}>
				<IconButton aria-label="cart" component={Link} to="/cart">
					<ShoppingCartIcon />
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
