import React from 'react'

export const Filter = ({ setFilters, filters }) => {
  return (
    <div className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor="favourite">Favourite</label>
        <select
          name="favourite"
          id="favourite"
          className="form-select"
          onChange={(e) => {
            let favouredFilter = 'any'

            if (e.target.value === 'favoured') {
              favouredFilter = true
            }
            if (e.target.value === 'not favoured') {
              favouredFilter = false
            }
            if (e.target.value === 'any') {
              favouredFilter = 'any'
            }

            setFilters({
              ...filters,
              favoured: favouredFilter,
            })
          }}
        >
          <option value="any">Any</option>
          <option value="favoured">Favoured</option>
          <option value="not favoured">Not Favoured</option>
        </select>
      </div>

      <div className="filter-container">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          className="form-select"
          onChange={(e) => {
            setFilters({
              ...filters,
              gender: e.target.value,
            })
          }}
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  )
}
