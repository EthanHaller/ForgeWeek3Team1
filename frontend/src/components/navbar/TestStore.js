import React, { useState, useContext } from "react";
import Cart from "./Cart";
import CartContext from "./CartContext";

function TestStore() {
	const [inputValue, setInputValue] = useState("");

	const { testProducts, setTestProducts } = useContext(CartContext);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleConfirmClick = () => {
		if (inputValue !== "") {
			const updatedProductNums = [...testProducts, parseFloat(inputValue)];

			setTestProducts(updatedProductNums);
			setInputValue("");
		}
	};

	return (
		<div>
			<input
				type="number"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Enter Product Number"
			/>
			<button onClick={handleConfirmClick}>Confirm</button>
		</div>
	);
}

export default TestStore;
