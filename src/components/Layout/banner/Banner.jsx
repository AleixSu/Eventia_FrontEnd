import React from 'react'
import { locationsSrc } from '../../../constants/locationConstants'
import './Banner.css'

const Banner = ({ className, imageUrl, logo }) => {
  return (
    <div>
      <div
        className={`${className || ''} backgroundImg`}
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                '--bg-image': `url(${imageUrl})`
              }
            : {}
        }
      ></div>
      <div id='logoBannerDiv'>
        <img src={logo} alt='logoBanner' />
      </div>
    </div>
  )
}

export default Banner
