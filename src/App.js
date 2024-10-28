import React, { useState } from 'react'
import { evaluate, derivative } from 'mathjs'
import Plot from 'react-plotly.js'
import InputForm from './components/InputForm'
import ResultsTable from './components/ResultsTable'
import './App.css'
import Guide from './components/Guide'

const App = () => {
  const [results, setResults] = useState([])
  const [graphData, setGraphData] = useState([])
  const [tolerance, setTolerance] = useState(0)
  const [method, setMethod] = useState('')

  const bisectionMethod = (func, a, b, tol) => {
    setTolerance(tol)
    let iterations = []
    let c, prevC
    while ((b - a) / 2 > tol) {
      c = (a + b) / 2
      const error = prevC ? Math.abs((c - prevC) / c) * 100 : null
      iterations.push({
        a,
        b,
        c,
        fa: evaluate(func, { x: a }),
        fb: evaluate(func, { x: b }),
        fc: evaluate(func, { x: c }),
        error
      })
      prevC = c
      if (evaluate(func, { x: c }) === 0) break
      if (evaluate(func, { x: a }) * evaluate(func, { x: c }) < 0) b = c
      else a = c
    }
    setResults(prevResults => [...prevResults, ...iterations])
    setGraphData([
      {
        x: iterations.map(i => i.c),
        y: iterations.map(i => evaluate(func, { x: i.c })),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' }
      }
    ])
  }

  const fixedPointMethod = (func, x0, tol) => {
    setTolerance(tol)
    let iterations = []
    let x1, prevX1
    do {
      x1 = evaluate(func, { x: x0 })
      const error = prevX1 ? Math.abs((x1 - prevX1) / x1) * 100 : null
      iterations.push({ xn: x0, gxn: x1, error })
      prevX1 = x1
      x0 = x1
    } while (Math.abs(x1 - x0) > tol)
    setResults(prevResults => [...prevResults, ...iterations])
    setGraphData([
      {
        x: iterations.map((_, i) => i),
        y: iterations.map(i => i.gxn),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' }
      }
    ])
  }

  const newtonMethod = (func, x0, tol) => {
    setTolerance(tol)
    let iterations = []
    let x1, prevX1
    const dfunc = derivative(func, 'x').toString()
    do {
      x1 = x0 - evaluate(func, { x: x0 }) / evaluate(dfunc, { x: x0 })
      const error = prevX1 ? Math.abs((x1 - prevX1) / x1) * 100 : null
      iterations.push({
        xn: x0,
        fxn: evaluate(func, { x: x0 }),
        dfxn: evaluate(dfunc, { x: x0 }),
        x1,
        error
      })
      prevX1 = x1
      x0 = x1
    } while (Math.abs(x1 - x0) > tol)
    setResults(prevResults => [...prevResults, ...iterations])
    setGraphData([
      {
        x: iterations.map((_, i) => i),
        y: iterations.map(i => i.x1),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'green' }
      }
    ])
  }

  const secantMethod = (func, x0, x1, tol) => {
    setTolerance(tol)
    let iterations = []
    let x2, prevX2
    do {
      x2 =
        x1 -
        (evaluate(func, { x: x1 }) * (x1 - x0)) /
          (evaluate(func, { x: x1 }) - evaluate(func, { x: x0 }))
      const error = prevX2 ? Math.abs((x2 - prevX2) / x2) * 100 : null
      iterations.push({
        xn: x1,
        xn1: x0,
        fxn: evaluate(func, { x: x1 }),
        fxn1: evaluate(func, { x: x0 }),
        x2,
        error
      })
      prevX2 = x2
      x0 = x1
      x1 = x2
    } while (Math.abs(x2 - x1) > tol)
    setResults(prevResults => [...prevResults, ...iterations])
    setGraphData([
      {
        x: iterations.map((_, i) => i),
        y: iterations.map(i => i.x2),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'purple' }
      }
    ])
  }

  const modifiedNewtonMethod = (func, x0, m, tol) => {
    setTolerance(tol)
    let iterations = []
    let x1, prevX1
    const dfunc = derivative(func, 'x').toString()
    do {
      x1 = x0 - (m * evaluate(func, { x: x0 })) / evaluate(dfunc, { x: x0 })
      const error = prevX1 ? Math.abs((x1 - prevX1) / x1) * 100 : null
      iterations.push({
        xn: x0,
        fxn: evaluate(func, { x: x0 }),
        dfxn: evaluate(dfunc, { x: x0 }),
        x1,
        error
      })
      prevX1 = x1
      x0 = x1
    } while (Math.abs(x1 - x0) > tol)
    setResults(prevResults => [...prevResults, ...iterations])
    setGraphData([
      {
        x: iterations.map((_, i) => i),
        y: iterations.map(i => i.x1),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'orange' }
      }
    ])
  }

  const lagrangeInterpolation = points => {
    const n = points.length
    let terms = []
    for (let i = 0; i < n; i++) {
      let term = `${points[i].y}`
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          term += ` * (x - ${points[j].x}) / (${points[i].x} - ${points[j].x})`
        }
      }
      terms.push(term)
    }
    const func = terms.join(' + ')
    return func
  }

  const nevilleMethod = points => {
    const n = points.length
    let p = Array.from({ length: n }, () => Array(n).fill(0))
    for (let i = 0; i < n; i++) {
      p[i][0] = points[i].y
    }
    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        p[i][j] = `((x - ${points[i + j].x}) * (${p[i][j - 1]}) + (${points[i].x} - x) * (${
          p[i + 1][j - 1]
        })) / (${points[i].x} - ${points[i + j].x})`
      }
    }
    return p[0][n - 1]
  }

  const dividedDifferences = points => {
    const n = points.length
    let f = Array.from({ length: n }, () => Array(n).fill(0))
    for (let i = 0; i < n; i++) {
      f[i][0] = points[i].y
    }
    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        f[i][j] = `(${f[i + 1][j - 1]} - ${f[i][j - 1]}) / (${points[i + j].x} - ${points[i].x})`
      }
    }
    let func = `${f[0][0]}`
    for (let i = 1; i < n; i++) {
      let term = `${f[0][i]}`
      for (let j = 0; j < i; j++) {
        term += ` * (x - ${points[j].x})`
      }
      func += ` + ${term}`
    }
    return func
  }

  const hermiteInterpolation = (points, derivatives) => {
    const n = points.length
    let q = Array.from({ length: 2 * n }, () => Array(2 * n).fill(0))
    let z = Array(2 * n).fill(0)
    for (let i = 0; i < n; i++) {
      z[2 * i] = z[2 * i + 1] = points[i].x
      q[2 * i][0] = q[2 * i + 1][0] = points[i].y
      q[2 * i + 1][1] = derivatives[i]
      if (i !== 0) {
        q[2 * i][1] = `(${q[2 * i][0]} - ${q[2 * i - 1][0]}) / (${z[2 * i]} - ${z[2 * i - 1]})`
      }
    }
    for (let i = 2; i < 2 * n; i++) {
      for (let j = 2; j <= i; j++) {
        q[i][j] = `(${q[i][j - 1]} - ${q[i - 1][j - 1]}) / (${z[i]} - ${z[i - j]})`
      }
    }
    let func = `${q[0][0]}`
    for (let i = 1; i < 2 * n; i++) {
      let term = `${q[i][i]}`
      for (let j = 0; j < i; j++) {
        term += ` * (x - ${z[j]})`
      }
      func += ` + ${term}`
    }
    return func
  }

  const leastSquaresMethod = points => {
    const n = points.length
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0
    for (let i = 0; i < n; i++) {
      sumX += points[i].x
      sumY += points[i].y
      sumXY += points[i].x * points[i].y
      sumX2 += points[i].x * points[i].x
    }
    const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const b = (sumY - a * sumX) / n
    const func = `${a} * x + ${b}`
    return func
  }

  const handleFormSubmit = (method, func, a, b, tol, points, derivatives, x, m) => {
    setMethod(method)
    switch (method) {
      case 'bisection':
        bisectionMethod(func, a, b, tol)
        break
      case 'fixedPoint':
        fixedPointMethod(func, a, tol)
        break
      case 'newton':
        newtonMethod(func, b, a, tol)
        break
      case 'secant':
        secantMethod(func, a, b, tol)
        break
      case 'modifiedNewton':
        modifiedNewtonMethod(func, b, a, m, tol)
        break
      case 'lagrange':
        const lagrangeFunc = lagrangeInterpolation(points)
        const lagrangeY = evaluate(lagrangeFunc, { x })
        const lagrangeError = Math.abs(lagrangeY - points[points.length - 1].y)
        const lagrangeErrorPercentage =
          (lagrangeError / Math.abs(points[points.length - 1].y)) * 100
        setResults(prevResults => [
          ...prevResults,
          {
            x,
            y: lagrangeY,
            func: lagrangeFunc,
            error: lagrangeError,
            errorPercentage: lagrangeErrorPercentage
          }
        ])
        break
      case 'neville':
        const nevilleFunc = nevilleMethod(points)
        const nevilleY = evaluate(nevilleFunc, { x })
        const nevilleError = Math.abs(nevilleY - points[points.length - 1].y)
        const nevilleErrorPercentage = (nevilleError / Math.abs(points[points.length - 1].y)) * 100
        setResults(prevResults => [
          ...prevResults,
          {
            x,
            y: nevilleY,
            func: nevilleFunc,
            error: nevilleError,
            errorPercentage: nevilleErrorPercentage
          }
        ])
        break
      case 'dividedDifferences':
        const dividedFunc = dividedDifferences(points)
        const dividedY = evaluate(dividedFunc, { x })
        const dividedError = Math.abs(dividedY - points[points.length - 1].y)
        const dividedErrorPercentage = (dividedError / Math.abs(points[points.length - 1].y)) * 100
        setResults(prevResults => [
          ...prevResults,
          {
            x,
            y: dividedY,
            func: dividedFunc,
            error: dividedError,
            errorPercentage: dividedErrorPercentage
          }
        ])
        break
      case 'hermite':
        const hermiteFunc = hermiteInterpolation(points, derivatives)
        const hermiteY = evaluate(hermiteFunc, { x })
        const hermiteError = Math.abs(hermiteY - points[points.length - 1].y)
        const hermiteErrorPercentage = (hermiteError / Math.abs(points[points.length - 1].y)) * 100
        setResults(prevResults => [
          ...prevResults,
          {
            x,
            y: hermiteY,
            func: hermiteFunc,
            derivativeGrade: derivatives.length,
            error: hermiteError,
            errorPercentage: hermiteErrorPercentage
          }
        ])
        break
      case 'leastSquares':
        const leastSquaresFunc = leastSquaresMethod(points)
        const leastSquaresY = evaluate(leastSquaresFunc, { x })
        const leastSquaresError = Math.abs(leastSquaresY - points[points.length - 1].y)
        const leastSquaresErrorPercentage =
          (leastSquaresError / Math.abs(points[points.length - 1].y)) * 100
        setResults(prevResults => [
          ...prevResults,
          {
            x,
            y: leastSquaresY,
            func: leastSquaresFunc,
            error: leastSquaresError,
            errorPercentage: leastSquaresErrorPercentage
          }
        ])
        break
      default:
        break
    }
  }

  return (
    <div className='app'>
      <InputForm onSubmit={handleFormSubmit} />
      <ResultsTable results={results} tol={tolerance} method={method} />
      <Plot data={graphData} layout={{ title: 'Graph' }} />
      <div>
        <Guide />
      </div>
    </div>
  )
}

export default App
