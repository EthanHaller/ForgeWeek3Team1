import { Box, Button, Typography } from "@mui/material"
import axios from "axios";

function TotalAndCheckout() {
    const handleCheckout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/checkout')
        .then(res => window.location.href = res.data)
    }

	return (
		<>
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3'>Total: $###.##</Typography>
                <Button onClick={handleCheckout} variant='contained' sx={{ width: 'calc(100px + 6vw)'}}>CHECK OUT</Button>
            </Box>
		</>
	)
}

export default TotalAndCheckout
