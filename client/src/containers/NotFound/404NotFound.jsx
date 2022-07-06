import React from 'react'
import { Link } from 'react-router-dom'
import dogAnimated from '../../images/dogAnimated.gif'
import './404NotFound.css'
const NotFound = () => {
  return (
    <section className='notFoundContainer'>
      <h1>No se encontró esta página.</h1>
      <img src={dogAnimated} alt="404 Not Found, No se encontró esta página"/>
      <Link to='/home'>Ir al Inicio</Link>
    </section>
  )
}

export default NotFound