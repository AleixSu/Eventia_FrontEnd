import React from 'react'
import './LoadingIcon.css'

const LoadingIcon = ({ size, borderSize, text, classList = 'divLoading' }) => {
  return (
    <div className={classList}>
      <div
        className='spinner'
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `${borderSize}px solid var(--color-surface)`,
          borderTop: `${borderSize}px solid var(--color-primary)`
        }}
      ></div>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

export default LoadingIcon
