import React from 'react'
import ReactStars from 'react-rating-stars-component';
const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        activeColor: "tomato",
        color: "rgba(20,20,20,0.1)",
        value: review.rating,
        isHalf: true,
    };
    const url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIKcTkARlljahDz7xR5gq-lwY3NSwsYMQdl_AlXfua4Yc2QcQ9QIG38gxtEiMGNAdoEck&usqp=CAU'
  return (
    <div className='ReviewCard'>
        <img  src={url} alt="avatar"/>
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard