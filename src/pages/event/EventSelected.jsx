import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from '../../utils/api/api'
import Banner from '../../components/Layout/banner/Banner'
import { locationsSrc } from '../../constants/locationConstants'
import './EventSelected.css'
import AttendeeCard from '../../components/UI/card/attendeeCard/AttendeeCard'
import Button from '../../components/UI/button/Button'
import { useAuthContext } from '../../context/AuthContext'

const EventSelected = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [event, setEvent] = useState(location.state?.event || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, token } = useAuthContext()

  useEffect(() => {
    if (
      event &&
      event.attendees &&
      event.attendees.length >= 0 &&
      event.attendees[0]?.nickName !== undefined
    ) {
      setLoading(false)
      return
    }

    const fetchEvent = async () => {
      try {
        setLoading(true)
        const result = await API({
          endpoint: `/events/${id}`,
          method: 'GET'
        })

        if (result.status === 200) {
          setEvent(result.data)
        } else {
          setError('Event not found')
        }
      } catch (err) {
        setError('Error loading event')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const handleAssistButton = async () => {
    try {
      const result = await API({
        endpoint: `/events/${event._id}/sign_up`,
        method: 'PATCH',
        token: token
      })

      if (result.status === 200) {
        setEvent(result.data.event)
      } else {
        console.error('Error applying to event', result.data)
        setError(result.data?.error || 'Error joining event')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error joining event')
    }
  }

  if (loading) return <div className='loading'>Loading event...</div>
  if (error) return <div className='error'>{error}</div>
  if (!event) return <div>Event not found</div>

  let numeration = 1

  return (
    <section id='eventSelected'>
      <Banner imageUrl={event.eventBgImg} logo={locationsSrc.logoBanner} />
      <article id='articleEventSelected'>
        <div id='eventHeader'>
          <h2>
            {event.eventName} - {event.locationCity},{' '}
            {event.locationCountry?.country} (
            {new Date(event.date).toLocaleDateString()})
          </h2>
          <Button
            className={'backButton'}
            text={'Back to Events'}
            fnc={() => navigate(-1)}
          />
        </div>
        <div id='infoDiv'>
          <img src={event.eventImg} alt='Event Img' />
          <div id='eventDescriptionDiv'>
            <p>{event.description}</p>
            {user ? (
              <Button
                className={'assistButton'}
                text={"I'm Going!"}
                fnc={handleAssistButton}
              />
            ) : null}
          </div>
        </div>
        <div id='attendeesListDiv'>
          <h2>Attendee's List:{!user ? '' : event.attendees?.length || 0}</h2>
          <div id='attendeesList'>
            {user ? (
              !event.attendees || event.attendees.length === 0 ? (
                <h4 id='beTheFirst'>
                  ¡Come on, be the first to confirm your attendance to this
                  event!
                </h4>
              ) : (
                <ul>
                  {event.attendees.map((attendee) => (
                    <li key={attendee._id}>
                      <AttendeeCard
                        attendee={attendee}
                        numeration={numeration++}
                      />
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <h4 id='registerNote'>
                ¡Register or login to be able to assist the event and watch the
                attendee's list!
              </h4>
            )}
          </div>
        </div>
      </article>
    </section>
  )
}

export default EventSelected
