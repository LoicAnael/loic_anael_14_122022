import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useAsyncDebounce } from 'react-table'
import '../../pages/employeeList/employeeList.css'

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 1000)

  return (
    <div>
      <span>Search:{''}</span>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder="Search..."
        className="header-search__input"
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="header-search__icone"
      />
    </div>
  )
}

export default GlobalFilter
