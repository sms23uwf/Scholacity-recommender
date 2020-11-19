import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({currentValue, onRatingChange}) => {
    const [rating, setRating] = useState(null);

    setRating(currentValue);

    return (
    <div>
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return 
            <label>
                <input 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => {}
                />
                <FaStar 
                    class="star" 
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"} 
                    size={100} 
                />
            </label>
        })}
    </div>
    );
};

export default StarRating