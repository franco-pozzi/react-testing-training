import React from 'react'
import { Card } from '../Card/Card'
import './Cards.css'

export const Cards = ({ cats }) => {
  return (
    <div className="pet-cards-container">
      {cats.map((cat, key) => (
        <Card {...cat} key={key} />
      ))}
    </div>
  )
}
