import React from 'react'
import { Card } from '../Card/Card'
import './Cards.css'

export const Cards = ({ filterCats, setCats }) => {
  const updateFavourite = (index, favoured) => {
    const updatedCats = [...filterCats]

    updatedCats[index].favoured = favoured

    setCats(updatedCats)
  }

  return (
    <div className="pet-cards-container">
      {filterCats.map((cat, index) => (
        <Card
          {...cat}
          key={cat.id}
          updateFavourite={updateFavourite}
          index={index}
        />
      ))}
    </div>
  )
}
