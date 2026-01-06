import LocationsList from '../../components/Forms/LocationList/LocationsList'
import Banner from '../../components/Layout/banner/Banner'
import { locationsSrc } from '../../constants/locationConstants'

import './Location.css'
import React from 'react'

const Location = () => {
  return (
    <main id='main'>
      <section id='location'>
        <Banner
          imageUrl={'./images/locationsBg.png'}
          logo={locationsSrc.logoBanner}
        />
        <article id='articleLocations'>
          <h2>LOCATIONS</h2>
          <div id='locationsDiv'>
            <LocationsList />
          </div>
        </article>
      </section>
    </main>
  )
}

export default Location
