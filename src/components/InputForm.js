import React, { useState } from 'react'

const InputForm = ({ onSubmit }) => {
  const [method, setMethod] = useState('')
  const [func, setFunc] = useState('')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [tol, setTol] = useState('')
  const [numPoints, setNumPoints] = useState(2)
  const [numDerivatives, setNumDerivatives] = useState(2)
  const [points, setPoints] = useState([
    { x: '', y: '' },
    { x: '', y: '' }
  ])
  const [derivatives, setDerivatives] = useState(['', ''])
  const [x, setX] = useState('')
  const [m, setM] = useState('')

  const handleNumPointsChange = e => {
    const num = parseInt(e.target.value)
    setNumPoints(num)
    setPoints(Array.from({ length: num }, (_, i) => points[i] || { x: '', y: '' }))
  }

  const handleNumDerivativesChange = e => {
    const num = parseInt(e.target.value)
    setNumDerivatives(num)
    setDerivatives(Array.from({ length: num }, (_, i) => derivatives[i] || ''))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(
      method,
      func,
      parseFloat(a),
      parseFloat(b),
      parseFloat(tol),
      points.map(p => ({ x: parseFloat(p.x), y: parseFloat(p.y) })),
      derivatives.map(d => parseFloat(d)),
      parseFloat(x),
      parseInt(m)
    )
  }

  return (
    <form className='input-form' onSubmit={handleSubmit}>
      <label>
        Method:
        <select value={method} onChange={e => setMethod(e.target.value)}>
          <option value=''>Select a method</option>
          <option value='bisection'>Bisection</option>
          <option value='fixedPoint'>Fixed Point</option>
          <option value='newton'>Newton</option>
          <option value='secant'>Secant</option>
          <option value='modifiedNewton'>Modified Newton</option>
          <option value='lagrange'>Lagrange</option>
          <option value='neville'>Neville</option>
          <option value='dividedDifferences'>Divided Differences</option>
          <option value='hermite'>Hermite</option>
          <option value='leastSquares'>Least Squares</option>
        </select>
      </label>
      {(method === 'bisection' ||
        method === 'fixedPoint' ||
        method === 'newton' ||
        method === 'secant' ||
        method === 'modifiedNewton') && (
        <>
          <label>
            Function:
            <input type='text' value={func} onChange={e => setFunc(e.target.value)} />
          </label>
          <label>
            a:
            <input type='text' value={a} onChange={e => setA(e.target.value)} />
          </label>
          <label>
            b:
            <input type='text' value={b} onChange={e => setB(e.target.value)} />
          </label>
          <label>
            Tolerance:
            <input type='text' value={tol} onChange={e => setTol(e.target.value)} />
          </label>
        </>
      )}
      {(method === 'lagrange' ||
        method === 'neville' ||
        method === 'dividedDifferences' ||
        method === 'hermite' ||
        method === 'leastSquares') && (
        <>
          <label>
            Number of Points:
            <input type='number' value={numPoints} onChange={handleNumPointsChange} min='2' />
          </label>
          {points.map((point, index) => (
            <div key={index}>
              <label>
                Point {index + 1} (x, y):
                <input
                  type='text'
                  value={point.x}
                  onChange={e => {
                    const newPoints = [...points]
                    newPoints[index].x = e.target.value
                    setPoints(newPoints)
                  }}
                />
                <input
                  type='text'
                  value={point.y}
                  onChange={e => {
                    const newPoints = [...points]
                    newPoints[index].y = e.target.value
                    setPoints(newPoints)
                  }}
                />
              </label>
            </div>
          ))}
        </>
      )}
      {(method === 'lagrange' ||
        method === 'neville' ||
        method === 'dividedDifferences' ||
        method === 'hermite') && (
        <label>
          x (for interpolation):
          <input type='text' value={x} onChange={e => setX(e.target.value)} />
        </label>
      )}
      {method === 'hermite' && (
        <>
          <label>
            Number of Derivatives:
            <input
              type='number'
              value={numDerivatives}
              onChange={handleNumDerivativesChange}
              min='2'
            />
          </label>
          {derivatives.map((derivative, index) => (
            <div key={index}>
              <label>
                Derivative {index + 1}:
                <input
                  type='text'
                  value={derivative}
                  onChange={e => {
                    const newDerivatives = [...derivatives]
                    newDerivatives[index] = e.target.value
                    setDerivatives(newDerivatives)
                  }}
                />
              </label>
            </div>
          ))}
        </>
      )}
      {method === 'modifiedNewton' && (
        <label>
          Multiplicity (for Modified Newton):
          <input type='text' value={m} onChange={e => setM(e.target.value)} />
        </label>
      )}
      <button type='submit'>Submit</button>
    </form>
  )
}

export default InputForm
