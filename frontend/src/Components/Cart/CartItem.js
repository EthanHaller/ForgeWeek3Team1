import React, { useEffect, useState } from "react"

function CartItem({ itemId }) {

    useEffect(() => {
        fetchItem(itemId)
    },[itemId])

    const fetchItem = async (id) => {
		const res = await axios.get(
			`http://localhost:9000/products/get-product/${id}`
		)
		return res.data
	}
}

export default CartItem