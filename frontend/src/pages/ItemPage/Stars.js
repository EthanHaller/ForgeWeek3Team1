import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './ItemPage.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Stars(number) {
    const [fullStars, setFullStars] = useState(0)
    const [halfStars, setHalfStars] = useState(0)
    const [emptyStars, setEmptyStars] = useState(0)

    const params = useParams();
    const id = params.id;

    function howMany() {
        let fullStars = Math.floor(number.number);
        if (number.number - fullStars > 0.75) {
            fullStars++;
        }
        setFullStars(fullStars)
        let halfStars = number.number - fullStars;
        if (halfStars >= 0.35 && halfStars <= 0.75) {
            halfStars = 1;
        }
        else {
            halfStars = 0;
        }
        setHalfStars(halfStars)
        setEmptyStars(5 - (fullStars + halfStars))

    }

    useEffect(() => {
        howMany();
    }, [id])
    if (fullStars)
        return (
            <>
                {id && <>
                    {fullStars >= 1 &&
                        <StarIcon sx={{ color: "#FF9529" }} />}
                    {fullStars >= 2 &&
                        <StarIcon sx={{ color: "#FF9529" }} />}
                    {fullStars >= 3 &&
                        <StarIcon sx={{ color: "#FF9529" }} />}
                    {fullStars >= 4 &&
                        <StarIcon sx={{ color: "#FF9529" }} />}
                    {fullStars >= 5 &&
                        <StarIcon sx={{ color: "#FF9529" }} />}
                    {halfStars === 1 &&
                        <StarHalfIcon sx={{ color: "#FF9529" }} />}
                    {emptyStars >= 1 &&
                        <StarBorderIcon sx={{ color: "#FF9529" }} />}
                    {emptyStars >= 2 &&
                        <StarBorderIcon sx={{ color: "#FF9529" }} />}
                    {emptyStars >= 3 &&
                        <StarBorderIcon sx={{ color: "#FF9529" }} />}
                    {emptyStars >= 4 &&
                        <StarBorderIcon sx={{ color: "#FF9529" }} />}
                    {emptyStars >= 5 &&
                        <StarBorderIcon sx={{ color: "#FF9529" }} />}
                </>}
            </>
        )
}