import React from 'react'
import './Guide.css'

const Guide = () => {
  return (
    <div className='guide'>
      <h2>Guía para Ingresar Funciones en mathjs</h2>
      <h3>Caracteres y Operadores Básicos</h3>
      <ul>
        <li>
          <strong>Suma (+)</strong>: <code>x + y</code>
        </li>
        <li>
          <strong>Resta (-)</strong>: <code>x - y</code>
        </li>
        <li>
          <strong>Multiplicación (*)</strong>: <code>x * y</code>
        </li>
        <li>
          <strong>División (/)</strong>: <code>x / y</code>
        </li>
        <li>
          <strong>Potencia (^)</strong>: <code>x ^ y</code>
        </li>
        <li>
          <strong>Paréntesis</strong>: <code>( )</code> para agrupar operaciones
        </li>
      </ul>

      <h3>Funciones Matemáticas Comunes</h3>
      <ul>
        <li>
          <strong>Raíz Cuadrada</strong>: <code>sqrt(x)</code>
        </li>
        <li>
          <strong>Logaritmo Natural</strong>: <code>log(x)</code>
        </li>
        <li>
          <strong>Logaritmo Base 10</strong>: <code>log10(x)</code>
        </li>
        <li>
          <strong>Exponencial</strong>: <code>exp(x)</code>
        </li>
        <li>
          <strong>Seno</strong>: <code>sin(x)</code>
        </li>
        <li>
          <strong>Coseno</strong>: <code>cos(x)</code>
        </li>
        <li>
          <strong>Tangente</strong>: <code>tan(x)</code>
        </li>
        <li>
          <strong>Arcoseno</strong>: <code>asin(x)</code>
        </li>
        <li>
          <strong>Arcocoseno</strong>: <code>acos(x)</code>
        </li>
        <li>
          <strong>Arcotangente</strong>: <code>atan(x)</code>
        </li>
      </ul>

      <h3>Constantes</h3>
      <ul>
        <li>
          <strong>Pi</strong>: <code>pi</code>
        </li>
        <li>
          <strong>Euler</strong>: <code>e</code>
        </li>
      </ul>

      <h3>Ejemplos de Funciones</h3>
      <ul>
        <li>
          <strong>Función Lineal</strong>: <code>f(x) = 2 * x + 3</code>
        </li>

        <li>
          <strong>raiz diferente a 2</strong>:{' '}
          <code>nthRoot(1 - x//operacion, numero de raiz)</code>
        </li>
        <li>
          <strong>Función Cuadrática</strong>: <code>f(x) = x^2 - 4 * x + 4</code>
        </li>
        <li>
          <strong>Función Trigonométrica</strong>: <code>f(x) = sin(x) + cos(x)</code>
        </li>
        <li>
          <strong>Función Exponencial</strong>: <code>f(x) = exp(x) - 1</code>
        </li>
        <li>
          <strong>Función Logarítmica</strong>: <code>f(x) = log(x) + log10(x)</code>
        </li>
        <li>
          <strong>Función con Raíz Cuadrada</strong>: <code>f(x) = sqrt(x^2 + 1)</code>
        </li>
      </ul>
    </div>
  )
}

export default Guide
