import { useLocation } from 'react-router-dom'
import React from 'react'
import Banner from '../../components/Layout/banner/Banner'
import './EditLocation.css'
import UpdateLocationInfo from '../../components/Forms/updateLocationInfo/UpdateLocationInfo'
import { Helmet } from 'react-helmet-async'

const EditLocation = () => {
  const location = useLocation()
  const locationData = location.state?.locationData

  return (
    <>
      <Helmet>
        <title>Edit Location | EventHub</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <section id='editLocationAdminArea'>
        <Banner
          className={'backgroundEditLocationAdminArea'}
          imageUrl={'/images/adminAreaBg.jpeg'}
          logo={'/images/adminLogo.png'}
        />
        <article id='articleEditLocationAdminArea'>
          <UpdateLocationInfo location={locationData} />
        </article>
      </section>{' '}
    </>
  )
}

export default EditLocation
