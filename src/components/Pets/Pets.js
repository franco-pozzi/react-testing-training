import React, { useState, useEffect } from 'react'

import { Cards } from '../Cards/Cards'
import { Filter } from '../Filter/Filter'

import axios from 'axios'

import './Pets.css'

export const Pets = () => {
  const [cats, setCats] = useState([])

  const [filterCats, setFilterCats] = useState([])

  const [filters, setFilters] = useState({
    gender: 'any',
    favoured: 'any',
  })

  useEffect(() => {
    axios
      .get('http://localhost:4000/cats')
      .then((res) => setCats(res.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    let catsFiltered = [...cats]

    if (filters.gender !== 'any') {
      catsFiltered = catsFiltered.filter((cat) => cat.gender === filters.gender)
    }

    if (filters.favoured !== 'any') {
      catsFiltered = catsFiltered.filter(
        (cat) => cat.favoured === filters.favoured,
      )
    }

    setFilterCats(catsFiltered)
  }, [filters, cats])

  return (
    <div className="container">
      <div className="app-container">
        <Filter setFilters={setFilters} filters={filters} />
        <Cards filterCats={filterCats} setCats={setCats} />
      </div>
    </div>
  )
}
