import React, { useEffect, useState } from 'react'
import Banner from '../../components/Layout/banner/Banner'
import './AdminArea.css'
import LocationForm from '../../components/Forms/adminForms/LocationForm'
import EventForm from '../../components/Forms/adminForms/EventForm'
import ModifyUserProfile from '../../components/Forms/adminForms/ModifyUserProfile'
import ModifyEvent from '../../components/Forms/adminForms/ModifyEvent'
import ModifyLocation from '../../components/Forms/adminForms/ModifyLocation'
import { Helmet } from 'react-helmet-async'

import { useGetEventsNames } from '../../utils/api/queries/events/useGetEventsNames'
import { useGetCountries } from '../../utils/api/queries/locations/useGetCountries'

const AdminArea = () => {
  const { data: locationsAvailable = [] } = useGetCountries()
  const { data: eventsNames = [] } = useGetEventsNames()

  return (
    <>
      <Helmet>
        <title>Admin Area | EventHub</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
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
              <EventForm
                locationsAvailable={locationsAvailable}
                /*            onEventCreated={fetchEventNames} */
              />
              <ModifyUserProfile />
              <ModifyEvent eventsNames={eventsNames} />
              <ModifyLocation locationsAvailable={locationsAvailable} />
            </div>
          </div>
        </article>
      </section>{' '}
    </>
  )
}

export default AdminArea
