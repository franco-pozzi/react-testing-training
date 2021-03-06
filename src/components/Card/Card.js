import React, { useState } from 'react'
import './Card.css'
import heartFilled from '../../images/heartFilled.svg'
import heartOutlined from '../../images/heartOutlined.svg'

export const Card = ({
  name,
  phone,
  email,
  image,
  favoured,
  index,
  updateFavourite,
}) => {
  const [isFavoured, setIsFavoured] = useState(favoured)

  const toggleFavoured = () => {
    updateFavourite(index, !isFavoured)

    setIsFavoured(!isFavoured)
  }

  return (
    <article style={{ margin: '0 30px' }}>
      <div className="card">
        <div className="card-header">
          <img className="card-img" src={image.url} alt={image.alt} />
          <button className="heart" onClick={toggleFavoured}>
            {isFavoured ? (
              <img src={heartFilled} alt="filled heart" />
            ) : (
              <img src={heartOutlined} alt="outlined heart" />
            )}
          </button>
        </div>
        <div className="card-content">
          <h3>{name}</h3>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
      </div>
    </article>
  )
}
