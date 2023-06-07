import "./ItemPage.css"
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@mui/material";
import Stars from "./Stars";

export default function ItemPage() {
    const [thisItem, setThisItem] = useState();
    const [otherItems, setOtherItems] = useState([]);
    const [currentBicPic, setCurrentBigPic] = useState();

    const params = useParams();
    const id = params.id;
    const category = params.category;

    async function getItem() {
        await fetch("http://localhost:9000/products/get-item", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
            .then((response) => response.json())
            .then((data) => {
                setThisItem(data)
                setCurrentBigPic(data.item.thumbnail)
            })
    }

    useEffect(() => {
        getItem();

    }, [])

    return (
        <>
            {thisItem &&
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button style={{ marginTop: "3%", marginLeft: "13.5%", width: "fit-content", color: "gray", textTransform: "none" }}
                        component={Link} to={"/products/" + category}>{"< Back to Products"}</Button>
                    <div className="itemStructure">
                        <div className="halves">
                            <div className="quarter">
                                <img src={thisItem.item.thumbnail} className="smallPic" onClick={() => {
                                    setCurrentBigPic(thisItem.item.thumbnail);
                                }}
                                    style={{
                                        boxShadow: currentBicPic === thisItem.item.thumbnail ? "0 0 5px 8px #99a98F" : "none",
                                        border: currentBicPic === thisItem.item.thumbnail ? "none" : "groove"
                                    }} />
                                {thisItem.item.images.map((element) =>
                                    element === thisItem.item.thumbnail ? <p1></p1> :
                                        <img src={element} alt="Pictures of product" className="smallPic"
                                            onClick={() => {
                                                setCurrentBigPic(element);
                                            }}
                                            style={{ boxShadow: currentBicPic === element ? "0 0 5px 8px #99a98F" : "none", border: currentBicPic === element ? "none" : "groove" }} />
                                )}
                            </div>
                            <div className="imageArea">
                                <img src={currentBicPic} style={{ width: "100%" }} />
                            </div>
                        </div>
                        <div className="halves">
                            <div className="halves" style={{ marginLeft: "5%", flexDirection: "column" }}>
                                <h2 style={{ textAlign: "left", marginTop: "0%" }}>{thisItem.item.title}</h2>
                                <h3 style={{ textAlign: "left", marginTop: "0%", display: "flex" }}>{thisItem.item.rating} {<Stars number={thisItem.item.rating} />}</h3>
                            </div>
                            <div className="halves" style={{ marginTop: "0%" }}>

                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}