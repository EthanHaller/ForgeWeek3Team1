import {
	Box,
	Drawer,
	IconButton,
	InputBase,
	TextField,
	Typography,
} from "@mui/material"
import React, { useState } from "react"
import { Navigate, redirect } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"

function Search() {
	const [searchValue, setSearchValue] = useState("")
	const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false)
    const [alreadySearched, setAlreadySearched] = useState(false)

	const toggleSearchDrawer = () => {
		setIsSearchDrawerOpen(!isSearchDrawerOpen)
	}

	const handleSearch = (e) => {
		e.preventDefault()
		if (searchValue === "") return
		console.log("Searching for " + searchValue)
        setAlreadySearched(true)
	}

    if(alreadySearched) return <Navigate to={`/products/${searchValue}`} />
	return (
		<>
			<IconButton onClick={toggleSearchDrawer}>
				<SearchIcon fontSize="large" />
			</IconButton>
			<Drawer anchor="right" open={isSearchDrawerOpen} onClick={toggleSearchDrawer}>
				<Box sx={{ width: { xs: "90vw", sm: "400px" } }}>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						<IconButton onClick={toggleSearchDrawer}>
							<CloseIcon fontSize="large" />
						</IconButton>
					</Box>
					<Typography
						variant="h2"
						sx={{ ml: "10%", fontSize: "calc(32px + 0.3vw)", textAlign: 'left' }}
					>
						Search
					</Typography>
					<form
						onSubmit={handleSearch}
						style={{
							marginLeft: "10%",
							marginTop: "15px",
							display: "flex",
							alignItems: "center",
						}}
					>
						<TextField
							onChange={(e) => setSearchValue(e.target.value)}
							variant="outlined"
							placeholder="Products, Categories, etc."
							sx={{ width: "80%" }}
						/>
						<IconButton type="submit">
							<SearchIcon fontSize="large" />
						</IconButton>
					</form>
				</Box>
			</Drawer>
		</>
	)
}

export default Search
