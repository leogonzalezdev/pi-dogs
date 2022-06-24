import React from 'react';
import Card from '../Card/Card';
import syles from './Cards.module.css';
const Cards = ({dogs}) => {
  return (
    <div className={syles.cardsContainer}>
      {
      dogs.map((dog)=>{
        return(<Card key={dog.id} id={dog.id} dog={dog}/>)
      })
      }
    </div>
  )
}

export default Cards