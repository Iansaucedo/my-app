import React from 'react'
import './ResultsTable.css'

const ResultsTable = ({ results, tol, method }) => {
  const renderHeaders = () => {
    switch (method) {
      case 'bisection':
        return (
          <>
            <th>Iteration</th>
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>f(a)</th>
            <th>f(b)</th>
            <th>f(c)</th>
            <th>Error</th>
            <th>Error %</th>
          </>
        )
      case 'fixedPoint':
        return (
          <>
            <th>Iteration</th>
            <th>
              x<sub>n</sub>
            </th>
            <th>
              g(x<sub>n</sub>)
            </th>
            <th>Error</th>
            <th>Error %</th>
          </>
        )
      case 'newton':
      case 'modifiedNewton':
        return (
          <>
            <th>Iteration</th>
            <th>
              x<sub>n</sub>
            </th>
            <th>
              f(x<sub>n</sub>)
            </th>
            <th>
              f'(x<sub>n</sub>)
            </th>
            <th>
              x<sub>n+1</sub>
            </th>
            <th>Error</th>
            <th>Error %</th>
          </>
        )
      case 'secant':
        return (
          <>
            <th>Iteration</th>
            <th>
              x<sub>n</sub>
            </th>
            <th>
              x<sub>n-1</sub>
            </th>
            <th>
              f(x<sub>n</sub>)
            </th>
            <th>
              f(x<sub>n-1</sub>)
            </th>
            <th>
              x<sub>n+1</sub>
            </th>
            <th>Error</th>
            <th>Error %</th>
          </>
        )
      case 'lagrange':
      case 'neville':
      case 'hermite':
      case 'dividedDifferences':
      case 'leastSquares':
        return (
          <>
            <th>x</th>
            <th>y</th>
            <th>Interpolated Function</th>
            {method === 'hermite' && <th>Derivative Grade</th>}
            <th>Error</th>
            <th>Error %</th>
          </>
        )
      default:
        return null
    }
  }

  const renderRows = () => {
    return results.map((result, index) => {
      switch (method) {
        case 'bisection':
          return (
            <tr key={index} className={result.fitsTolerance ? 'highlight' : ''}>
              <td>{index + 1}</td>
              <td>{result.a}</td>
              <td>{result.b}</td>
              <td>{result.c}</td>
              <td>{result.fa}</td>
              <td>{result.fb}</td>
              <td>{result.fc}</td>
              <td>{result.error}</td>
              <td>{result.error ? result.error.toFixed(2) + '%' : 'N/A'}</td>
            </tr>
          )
        case 'fixedPoint':
          return (
            <tr key={index} className={result.fitsTolerance ? 'highlight' : ''}>
              <td>{index + 1}</td>
              <td>{result.xn}</td>
              <td>{result.gxn}</td>
              <td>{result.error}</td>
              <td>{result.error ? result.error.toFixed(2) + '%' : 'N/A'}</td>
            </tr>
          )
        case 'newton':
        case 'modifiedNewton':
          return (
            <tr key={index} className={result.fitsTolerance ? 'highlight' : ''}>
              <td>{index + 1}</td>
              <td>{result.xn}</td>
              <td>{result.fxn}</td>
              <td>{result.dfxn}</td>
              <td>{result.x1}</td>
              <td>{result.error}</td>
              <td>{result.error ? result.error.toFixed(2) + '%' : 'N/A'}</td>
            </tr>
          )
        case 'secant':
          return (
            <tr key={index} className={result.fitsTolerance ? 'highlight' : ''}>
              <td>{index + 1}</td>
              <td>{result.xn}</td>
              <td>{result.xn1}</td>
              <td>{result.fxn}</td>
              <td>{result.fxn1}</td>
              <td>{result.x2}</td>
              <td>{result.error}</td>
              <td>{result.error ? result.error.toFixed(2) + '%' : 'N/A'}</td>
            </tr>
          )
        case 'lagrange':
        case 'neville':
        case 'hermite':
        case 'dividedDifferences':
        case 'leastSquares':
          return (
            <tr key={index} className={result.fitsTolerance ? 'highlight' : ''}>
              <td>{result.x}</td>
              <td>{result.y}</td>
              <td>{result.func}</td>
              {method === 'hermite' && <td>{result.derivativeGrade}</td>}
              <td>{result.error}</td>
              <td>{result.error ? result.error.toFixed(2) + '%' : 'N/A'}</td>
            </tr>
          )
        default:
          return null
      }
    })
  }

  return (
    <table className='results-table'>
      <thead>
        <tr>{renderHeaders()}</tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  )
}

export default ResultsTable
