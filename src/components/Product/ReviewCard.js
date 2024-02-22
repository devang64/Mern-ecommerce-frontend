import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profilePng from '../../Images/ProfilePng.png'
import { Rating } from '@mui/material';

const ReviewCard = ({ review }) => {
    const options = {
        size: "large",
        value: review.rating,
        readOnly :true,
        precision :   0.5
      };
    
    return (
        <div className='reviewcard' >
            <div className="profile">
                <img
                    className="profile-pic"
                    src={profilePng}
                />
                <h5 >{review.name}</h5>
                
            </div>
            <div className="star-comment">
            <Rating {...options} />
                <p className="content">
                    {review.comment}
                </p>
            </div>

        </div>



    )
}

export default ReviewCard