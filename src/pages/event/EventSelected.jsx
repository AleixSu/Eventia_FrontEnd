import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Banner from '../../components/Layout/banner/Banner'
import { locationsSrc } from '../../constants/locationConstants'
import './EventSelected.css'
import Button from '../../components/UI/button/Button'
import { useAuthContext } from '../../context/AuthContext'
import LoadingIcon from '../../components/UI/loadingIcon/LoadingIcon'
import AttendeesList from '../../components/Forms/eventComponents/attendeesList/AttendeesList'
import { Helmet } from 'react-helmet-async'
import { useGetEventById } from '../../utils/api/queries/events/useGetEventById'
import { useAssistManagement } from '../../utils/api/queries/users/useAssistManagement'

const EventSelected = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [imGoing, setImGoing] = useState(false)
  const { user, token } = useAuthContext()

  const {
    data: event,
    isLoading,
    isError,
    error
  } = useGetEventById(id, location.state?.event)

  const assistManagementMutation = useAssistManagement(token) //Aquí solo le pasamos lo que la petición necesitará.

  useEffect(() => {
    if (event && user && event.attendees) {
      const isAttending = event.attendees.some(
        (attendee) => attendee._id === user._id
      )
      console.log(isAttending)

      setImGoing(isAttending)
    }
  }, [event, user])

  const handleAssistButton = () => {
    const wasGoing = imGoing

    assistManagementMutation.mutate(
      // Y aquí ya si que le pasamos lo que la lógica dentro de la función useMutation necesitará.
      {
        eventId: event._id,
        isCurrentlyGoing: wasGoing
      },
      {
        onSuccess: () => {
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 3000)
        }
      }
    )
  }

  if (isLoading) {
    return <LoadingIcon size={50} borderSize={4} text={'Loading event...'} />
  }
  if (isError && !event) return <div className='error'>{error.message}</div>
  if (!event) return <div>Event not found</div>

  return (
    <>
      <Helmet>
        <title>{event.eventName} | EventHub</title>
        <meta
          name='description'
          content={`Join ${event.eventName} in ${event.locationCity}. ${event.description.substring(0, 150)}...`}
        />
        <link
          rel='canonical'
          href={`${import.meta.env.VITE_APP_URL}/events/${event._id}`}
        />
        <meta property='og:title' content={event.eventName} />
        <meta property='og:description' content={event.description} />
        <meta property='og:image' content={event.eventImg} />
        <meta property='og:url' content={window.location.href} />
      </Helmet>
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
                {assistManagementMutation.isPending && (
                  <div id='loadingEventDiv'>
                    {' '}
                    <LoadingIcon size={25} borderSize={2} />
                  </div>
                )}

                <div className='assistanceMessagesDiv'>
                  {success && (
                    <div className='confirmationEventText'>
                      <p>
                        {!assistManagementMutation.variables?.isCurrentlyGoing
                          ? "¡You're in! Your spot at the event is confirmed."
                          : "You've cancelled your attendance."}
                      </p>
                    </div>
                  )}
                  {assistManagementMutation.isError && (
                    <p className='errorMessage'>
                      {assistManagementMutation.error.message}
                    </p>
                  )}
                </div>
                {user && (
                  <Button
                    className={imGoing ? 'cancelButton' : 'assistButton'}
                    text={imGoing ? "I've changed my mind.." : "I'm Going!"}
                    fnc={handleAssistButton}
                    disabled={assistManagementMutation.isPending}
                  />
                )}
              </div>
            </div>
          </div>
          <div id='attendeesListDiv'>
            {user ? (
              <AttendeesList event={event} />
            ) : (
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
    </>
  )
}

export default EventSelected
