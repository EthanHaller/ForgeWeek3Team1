import React, { useState, useEffect } from "react"
import { AppBar, Toolbar, IconButton } from "@mui/material"
import MobileNavbar from "./MobileNavbar"
import DesktopNavbar from "./DesktopNavbar"
import MenuIcon from '@mui/icons-material/Menu'

function Navbar() {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
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
					{isMobile ? <MobileNavbar /> : <DesktopNavbar />}
				</Toolbar>
			</AppBar>
			<Toolbar />
		</>
	)
}

export default Navbar
