import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import check from './check.png'
import { useAuth } from "../../context/AuthContext"

function CheckoutSuccessPage() {
    const [params] = useSearchParams()
    const sessionID = params.get('session_id')
    const [name, setName] = useState("")
    const { currentUser } = useAuth()

    useEffect(() => {
        getCheckoutInfo();
    }, [sessionID])
    
    const getCheckoutInfo = () => {
        axios.get(`http://localhost:9000/checkout/order/success?session_id=${sessionID}`, {
            query: sessionID
        })
        .then(res => {
            console.log(res.data)
            setName(res.data.results)
            axios.post('http://localhost:9000/previous-orders/add',{
                sessionId: sessionID,
                data: res.data,
                user: currentUser.uid
            })
        })
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

// http://localhost:3000/order/success?session_id=cs_test_b1xWXooxVjW48thcUVoGv214RgLVbKuHri0vdTemJsuGTZ9htYEunExL3z