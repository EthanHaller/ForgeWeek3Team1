import { Button } from "@mui/material"
import axios from "axios"
import Reac from "react"

function CheckoutPage() {

    const handleCheckout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/checkout')
        .then(res => window.location.href = res.data)
    }

	return (
		<>
			<Button onClick={handleCheckout} >TEST CHECKOUT</Button>
		</>
	)
}

export default CheckoutPage
