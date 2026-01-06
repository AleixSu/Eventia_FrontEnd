import React from 'react'
import Banner from '../../components/Layout/banner/Banner'
import './AdminArea.css'
import LocationForm from '../../components/Forms/adminForms/LocationForm'
import EventForm from '../../components/Forms/adminForms/EventForm'

const AdminArea = () => {
  return (
    <section id='adminArea'>
      <Banner
        className={'backgroundAdminArea'}
        imageUrl={'./images/adminAreaBg.jpeg'}
        logo={'/images/adminLogo.png'}
      />
      <article id='articleAdminArea'>
        <div id='adminAreaDiv'>
          <h2>Admin Area</h2>
          <div id='formsDiv'>
            <LocationForm />
            <EventForm />
          </div>
        </div>
      </article>
    </section>
  )
}

export default AdminArea
