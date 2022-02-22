import React, { useState, useEffect } from 'react'

import { Cards } from '../Cards/Cards'
import { Filter } from '../Filter/Filter'

import axios from 'axios'

import { rest } from 'msw'

import './Pets.css'

export const Pets = () => {
  const [cats, setCats] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:4000/cats')
      .then((res) => setCats(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="container">
      <div className="app-container">
        <Filter />
        <Cards cats={cats} />
      </div>
    </div>
  )
}
