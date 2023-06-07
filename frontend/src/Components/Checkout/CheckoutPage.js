import { Button } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { Navigate } from "react-router-dom"

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
