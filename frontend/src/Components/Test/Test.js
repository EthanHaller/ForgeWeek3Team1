import React from "react"
import { Button } from "@mui/material"
import { Link } from 'react-router-dom'
function Test() {
	return (
		<>
			<h1>TEST</h1>
			<Button component={Link} to={"/products/womens-watches"}>Test</Button>
		</>
	)
}

export default Test
