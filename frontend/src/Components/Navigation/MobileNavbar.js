import React, { useState } from "react"
import { AppBar, Toolbar, IconButton, Drawer, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Link } from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

function MobileNavbar() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}
	return (
		<>
			<IconButton aria-label="menu" onClick={toggleDrawer}>
				<MenuIcon />
			</IconButton>
			<Typography component={Link} to="/">
				AppName
			</Typography>
			<IconButton
				aria-label="cart"
				component={Link}
				to="/cart"
			>
				<ShoppingCartIcon />
			</IconButton>
			<Drawer anchor="left">
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
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
