import {
	Box,
	Drawer,
	IconButton,
	InputBase,
	TextField,
	Typography,
} from "@mui/material"
import React, { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"

function Search() {
	const [searchValue, setSearchValue] = useState("")
	const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false)

	const toggleSearchDrawer = () => {
		setIsSearchDrawerOpen(!isSearchDrawerOpen)
	}

	const handleSearch = (e) => {
		e.preventDefault()
		if (searchValue === "") return
		console.log("submitting")
	}

	// return (
	// 	<Box
	// 		sx={{
	//             mr: '15px',
	// 			borderRadius: "10px",
	// 			backgroundColor: "rgba(0, 0, 0, 0.1)",
	// 			"&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
	// 		}}
	// 	>
	// 		<form onSubmit={handleSearch}>
	// 			<InputBase
	// 				placeholder="Search..."
	// 				onChange={(e) => setSearchValue(e.target.value)}
	// 				sx={{ pl: "15px", transition: '' }}
	// 			/>
	// 			<IconButton type="submit" onClick={handleSearch}>
	// 				<SearchIcon />
	// 			</IconButton>
	// 		</form>
	// 	</Box>
	// )

	return (
		<>
			<IconButton onClick={toggleSearchDrawer}>
				<SearchIcon fontSize="large" />
			</IconButton>
			<Drawer anchor="right" open={isSearchDrawerOpen}>
				<Box sx={{ width: { xs: "100vw", sm: "400px" } }}>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						<IconButton onClick={toggleSearchDrawer}>
							<CloseIcon fontSize="large" />
						</IconButton>
					</Box>
					<Typography
						variant="h2"
						sx={{ ml: "10%", fontSize: "calc(32px + 0.5vw)" }}
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
							placeholder="Search..."
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
