import { useLocation } from 'react-router-dom'
import React from 'react'
import UpdateInfoEvent from '../../components/Forms/updateEventInfo/UpdateInfoEvent'
import Banner from '../../components/Layout/banner/Banner'
import './EditEvent.css'

const EditEvent = () => {
  const location = useLocation()
  const event = location.state?.event

  return (
    <section id='editEventAdminArea'>
      <Banner
        className={'backgroundEditEventAdminArea'}
        imageUrl={'/images/adminAreaBg.jpeg'}
        logo={'/images/adminLogo.png'}
      />
      <article id='articleEditEventAdminArea'>
        <UpdateInfoEvent event={event} />
      </article>
    </section>
  )
}

export default EditEvent
