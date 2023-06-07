import "./App.css";

import Cart from "./components/navbar/Cart";
import TestStore from "./components/navbar/TestStore";
import CartContext from "./components/navbar/CartContext";
import { useState, createContext } from "react";

function App() {
	const [testProducts, setTestProducts] = useState([1, 2, 3, 4]);

	console.log("Test Products array", testProducts);

	return (
		<CartContext.Provider value={{ testProducts, setTestProducts }}>
			<TestStore />
			<Cart />
		</CartContext.Provider>
	);
}

export default App;
