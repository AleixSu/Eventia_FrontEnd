import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from '../../utils/api/api'
import Banner from '../../components/Layout/banner/Banner'
import { locationsSrc } from '../../constants/locationConstants'
import './EventSelected.css'
import AttendeeCard from '../../components/UI/card/attendeeCard/AttendeeCard'
import Button from '../../components/UI/button/Button'
import { useAuthContext } from '../../context/AuthContext'
import LoadingIcon from '../../components/UI/loadingIcon/LoadingIcon'
import AttendeesList from '../../components/Forms/eventComponents/attendeesList/AttendeesList'

const EventSelected = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [event, setEvent] = useState(location.state?.event || null)
  const [loading, setLoading] = useState(true)
  const [attending, setAttending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [imGoing, setImGoing] = useState(false)
  const { user, token } = useAuthContext()

  useEffect(() => {
    if (event && user && event.attendees) {
      const isAttending = event.attendees.some(
        (attendee) => attendee._id === user._id
      )
      setImGoing(isAttending)
    }
  }, [event, user])

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
    setAttending(true)
    setError('')
    try {
      const endpoint = imGoing
        ? `/events/${event._id}/unsign_up`
        : `/events/${event._id}/sign_up`

      const result = await API({
        endpoint: endpoint,
        method: 'PATCH',
        token: token
      })

      if (result.status === 200) {
        setEvent(result.data.event)
        setAttending(false)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      } else {
        setAttending(false)
        console.error('Error with event attendance', result.data)
        setError(result.data?.error || 'Error updating attendance')
      }
    } catch (err) {
      setAttending(false)
      console.error('Error:', err)
      setError('Error updating attendance')
    }
  }

  if (loading) return <div className='loading'>Loading event...</div>
  if (error && !event) return <div className='error'>{error}</div>
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
            <div id='buttonMessagesDiv'>
              {attending ? (
                <div id='loadingEventDiv'>
                  {' '}
                  <LoadingIcon size={25} borderSize={2} />
                </div>
              ) : null}
              {success ? (
                <div className='confirmationEventText'>
                  <p>
                    {imGoing
                      ? "¡You're in! Your spot at the event is confirmed."
                      : "You've cancelled your attendance."}
                  </p>
                </div>
              ) : null}
              {error && <p className='errorMessage'>{error}</p>}
              {user ? (
                <Button
                  className={imGoing ? 'cancelButton' : 'assistButton'}
                  text={imGoing ? "I've changed my mind.." : "I'm Going!"}
                  fnc={handleAssistButton}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div id='attendeesListDiv'>
          {user ? (
            <AttendeesList event={event} />
          ) : (
            /*               !event.attendees || event.attendees.length === 0 ? (
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
              ) */
            <>
              <h2>Who's going:</h2>
              <h4 id='registerNote'>
                ¡Register or login to be able to assist the event and watch
                who's going!
              </h4>
            </>
          )}
        </div>
      </article>
    </section>
  )
}

export default EventSelected
