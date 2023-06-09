var express = require("express")
var router = express.Router()
const db = require("./firebase")
const {
	serverTimestamp,
	query,
	collection,
	where,
	getDocs,
	addDoc,
    orderBy
} = require("firebase/firestore")

router.post("/add", async (req, res, next) => {
	const orderItems = req.body.data.lineItems.map((item) => {
		return {
			itemId: item.metadata.itemId,
			quantity: item.quantity,
		}
	})

	const q = query(
		collection(db, "previousOrders"),
		where("session", "==", req.body.sessionId)
	)
	const querySnapshot = await getDocs(q)
	let exists = false
	querySnapshot.forEach((doc) => {
		exists = true
	})
	if (!exists) {
		const docRef = await addDoc(collection(db, "previousOrders"), {
			uid: req.body.user,
			time: serverTimestamp(),
			session: req.body.sessionId,
			items: orderItems,
		})
	}
})

router.get('/:userId', async (req, res, next) => {
    const uid = req.params.userId

    const orders = []

    const q = query(collection(db, 'previousOrders'), where('uid', '==', uid), orderBy('time'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        orders.push(doc.data())
    })

    res.send({ results: orders })
})

module.exports = router
