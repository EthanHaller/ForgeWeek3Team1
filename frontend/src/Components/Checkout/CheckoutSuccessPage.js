import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import check from './check.png'

function CheckoutSuccessPage() {
    const [params] = useSearchParams()
    const sessionID = params.get('session_id')
    const [name, setName] = useState("")

    useEffect(() => {
        getCheckoutInfo();
    }, [sessionID])
    
    const getCheckoutInfo = () => {
        axios.get(`http://localhost:9000/checkout/order/success?session_id=${sessionID}`, {
            query: sessionID
        })
        .then(res => setName(res.data.results))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={check} alt="" style={{ width: 'calc(200px + 1vw)', paddingTop: '100px', paddingBottom: '50px' }}/>
            <Typography variant='h2' sx={{ fontSize: 'calc(48px + 1vw)', pb: '25px' }}>Thank You</Typography>
            <Typography variant='body1' sx={{ fontSize: 'calc(24px + 1vw)'}}>{`${name}, your order has been confirmed!`}</Typography>
        </Box>
    )
}

export default CheckoutSuccessPage