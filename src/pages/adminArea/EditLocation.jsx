import { useLocation } from 'react-router-dom'
import React from 'react'
import Banner from '../../components/Layout/banner/Banner'
import './EditLocation.css'
import UpdateLocationInfo from '../../components/Forms/updateLocationInfo/UpdateLocationInfo'

const EditLocation = () => {
  const location = useLocation()
  const locationData = location.state?.locationData

  return (
    <section id='editLocationAdminArea'>
      <Banner
        className={'backgroundEditLocationAdminArea'}
        imageUrl={'/images/adminAreaBg.jpeg'}
        logo={'/images/adminLogo.png'}
      />
      <article id='articleEditLocationAdminArea'>
        <UpdateLocationInfo location={locationData} />
      </article>
    </section>
  )
}

export default EditLocation
