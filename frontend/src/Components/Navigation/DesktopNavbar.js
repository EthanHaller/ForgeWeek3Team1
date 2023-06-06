import React from "react"
import {
	IconButton,
	Typography,
	Box,
} from "@mui/material"
import { Link } from "react-router-dom"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

function DesktopNavbar() {
	return (
		<>
			<Box sx={{ width: '30vw', display: 'flex', justifyContent: 'flex-start' }}></Box>
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
		</>
	)
}

export default DesktopNavbar
