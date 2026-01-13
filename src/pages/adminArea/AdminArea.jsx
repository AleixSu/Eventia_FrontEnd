import React from 'react'
import Banner from '../../components/Layout/banner/Banner'
import './AdminArea.css'
import LocationForm from '../../components/Forms/adminForms/LocationForm'
import EventForm from '../../components/Forms/adminForms/EventForm'
import ModifyUserProfile from '../../components/Forms/adminForms/ModifyUserProfile'
import ModifyEvent from '../../components/Forms/adminForms/ModifyEvent'

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
            <ModifyUserProfile />
            <ModifyEvent />
          </div>
        </div>
      </article>
    </section>
  )
}

export default AdminArea
