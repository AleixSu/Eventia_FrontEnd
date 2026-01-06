import React from 'react'
import './Button.css'
const Button = ({ type, key, text, className, fnc }) => {
  return (
    <button
      type={type}
      key={key}
      className={`mainButton ${className}`}
      onClick={fnc}
    >
      {text}
    </button>
  )
}

export default Button
