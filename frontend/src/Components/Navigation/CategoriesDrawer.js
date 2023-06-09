import React, { useState, useEffect } from "react"
import axios from "axios"
import {
	IconButton,
	Drawer,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Box,
} from "@mui/material"
import { Link } from "react-router-dom"
import CloseIcon from "@mui/icons-material/Close"

function CategoriesDrawer({ toggleDrawer, isDrawerOpen }) {
	const [allCategories, setAllCategories] = useState(null)

	useEffect(() => {
		getAllCategories()
	}, [])

	const getAllCategories = () => {
		axios
			.get("https://easybuy-7xer.onrender.com/categories")
			.then((res) => setAllCategories(res.data.results))
	}

	return (
		<Drawer
			open={isDrawerOpen}
			onClick={toggleDrawer}
			anchor="left"
			PaperProps={{ sx: { backgroundColor: "#FFF8DE" } }}
		>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<IconButton onClick={toggleDrawer}>
					<CloseIcon fontSize="large" />
				</IconButton>
			</Box>
			<Typography
				variant="h3"
				sx={{
					ml: "5%",
					mb: "2%",
					fontSize: "calc(28px + 0.3vw)",
					textAlign: "left",
				}}
			>
				Search By Category
			</Typography>
			<List
				disablePadding
				sx={{ width: { xs: "90vw", sm: "400px" }, mb: "75px" }}
			>
				{allCategories &&
					allCategories.map((category) => {
						return (
							<ListItem key={category.raw} sx={{ py: "0" }}>
								<ListItemButton
									component={Link}
									to={`/products/${category.raw}`}
								>
									<ListItemText
										primary={category.formatted}
										primaryTypographyProps={{
											fontSize: "calc(16px + 0.3vw)",
										}}
									/>
								</ListItemButton>
							</ListItem>
						)
					})}
			</List>
		</Drawer>
	)
}

export default CategoriesDrawer
