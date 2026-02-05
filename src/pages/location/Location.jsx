import { Helmet } from 'react-helmet-async'
import LocationsList from '../../components/Forms/LocationList/LocationsList'
import Banner from '../../components/Layout/banner/Banner'
import { locationsSrc } from '../../constants/locationConstants'

import './Location.css'
import React from 'react'

const Location = () => {
  return (
    <>
      <Helmet>
        <title>Explore Locations | EventHub</title>
        <meta
          name='description'
          content='Discover events in countries around the world. Browse locations and find events near you.'
        />
        <link
          rel='canonical'
          href={`${import.meta.env.VITE_APP_URL}/locations`}
        />
      </Helmet>
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
      </main>{' '}
    </>
  )
}

export default Location
