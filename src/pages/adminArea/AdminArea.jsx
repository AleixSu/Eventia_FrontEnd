import React, { useEffect, useState } from 'react'
import Banner from '../../components/Layout/banner/Banner'
import './AdminArea.css'
import LocationForm from '../../components/Forms/adminForms/LocationForm'
import EventForm from '../../components/Forms/adminForms/EventForm'
import ModifyUserProfile from '../../components/Forms/adminForms/ModifyUserProfile'
import ModifyEvent from '../../components/Forms/adminForms/ModifyEvent'
import ModifyLocation from '../../components/Forms/adminForms/ModifyLocation'
import { API } from '../../utils/api/api'

const AdminArea = () => {
  const [locationsAvailable, setLocationsAvailable] = useState([])
  const [eventsNames, setEventsNames] = useState([])

  const fetchLocations = async () => {
    try {
      const response = await API({
        endpoint: '/locations/countries'
      })

      if (response.status === 200) {
        setLocationsAvailable(
          response.data.sort((a, b) => a.country.localeCompare(b.country))
        )
      }
    } catch (err) {
      console.error('Error fetching locations:', err)
    }
  }

  const fetchEventNames = async () => {
    try {
      const response = await API({
        endpoint: '/events/getNameEvents'
      })
      if (response.status === 200) {
        setEventsNames(
          response.data.sort((a, b) => a.eventName.localeCompare(b.eventName))
        )
      }
    } catch (error) {
      console.error('Error fetching the names of the Events:', err)
    }
  }

  useEffect(() => {
    fetchLocations()
    fetchEventNames()
  }, [])

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
            <LocationForm onLocationCreated={fetchLocations} />
            <EventForm
              locationsAvailable={locationsAvailable}
              onEventCreated={fetchEventNames}
            />
            <ModifyUserProfile />
            <ModifyEvent eventsNames={eventsNames} />
            <ModifyLocation locationsAvailable={locationsAvailable} />
          </div>
        </div>
      </article>
    </section>
  )
}

export default AdminArea
