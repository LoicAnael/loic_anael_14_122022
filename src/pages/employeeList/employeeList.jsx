import React, { useMemo } from 'react'
import './employeeList.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUp,
  faArrowDown,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import COLUMNS from './columns'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import { useSelector } from 'react-redux'
import GlobalFilter from '../../components/globalFilter/globalFilter'

const EmployeeList = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useSelector((state) => state.employee)

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    setPageSize,
    canPreviousPage,
    state,
    canNextPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = tableInstance
  const isFilter = undefined !== state.globalFilter

  return (
    <div className="table">
      <h1 className="table-title">Current Employees</h1>
      <div className="table-header">
        <div className="table-header__entries">
          <span>Show</span>
          <select
            value={pageSize}
            className="table-header__select"
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        <div className="table-header__search">
          <GlobalFilter
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          className="table-content__icon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="table-content__icon"
                        />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="table-nav">
        {!isFilter ? (
          rows.length > 0 ? (
            <span className="table-nav__text">
              <span>Showing {pageIndex * pageSize + 1} to </span>
              <span>{pageIndex * pageSize + page.length}</span>
              <span> of {rows.length} entries</span>
            </span>
          ) : (
            'No matching records found'
          )
        ) : rows.length > 0 ? (
          <span className="table-nav__text">
            <span>Showing 1 to</span>
            <span>{page.length}</span>
            <span>of {rows.length} entries </span>
            <span>(filtered from {data.length} total entries)</span>
          </span>
        ) : (
          'No matching records found'
        )}

        <ul className="table-nav__list">
          <li>
            <button
              className="table-nav__list--button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="table-nav__list__icon--left"
                />
              }
              <span>Previous</span>
            </button>
          </li>
          <li>
            <p className="table-nav__list--text">{pageIndex + 1}</p>
          </li>
          <li>
            <button
              className="table-nav__list--button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <span>Next</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="table-nav__list__icon--right"
              />
            </button>
          </li>
        </ul>
      </nav>
      <NavLink to="/" className="table-link">
        Return Home
      </NavLink>
    </div>
  )
}

export default EmployeeList
