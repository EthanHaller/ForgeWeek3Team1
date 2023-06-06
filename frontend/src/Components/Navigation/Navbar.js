import React, { useState, useEffect } from "react"
import { AppBar, Toolbar } from "@mui/material"
import MobileNavbar from "./MobileNavbar"
import DesktopNavbar from "./DesktopNavbar"

function Navbar() {
	const [isMobile, setIsMobile] = useState(false)

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
					{isMobile ? <MobileNavbar /> : <DesktopNavbar />}
				</Toolbar>
			</AppBar>
			<Toolbar />
		</>
	)
}

export default Navbar
