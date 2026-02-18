import { Helmet } from 'react-helmet-async'
import Banner from '../../components/Layout/banner/Banner'
import EventLocationCard from '../../components/UI/card/eventCard/EventLocationCard'
import { myEventsSrc } from '../../constants/myEventsConstants'
import { useAuthContext } from '../../context/AuthContext'
import { useGetUser } from '../../utils/api/queries/users/useGetUser'
import './MyEvents.css'
import React from 'react'
import LoadingIcon from '../../components/UI/loadingIcon/LoadingIcon'

const MyEvents = () => {
  const { user } = useAuthContext()

  const { data: userInfo, isLoading, isError, error } = useGetUser(user?._id)

  if (isLoading) {
    return (
      <LoadingIcon size={50} borderSize={4} text={'Loading user Info...'} />
    )
  }
  if (isError) return <div className='error'>{error.message}</div>
  if (!userInfo) return <div>No user info found</div>

  return (
    <>
      <Helmet>
        <title>My Events | EventHub</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <section id='myEvents'>
        <Banner
          className={'backgroundMyEvents'}
          imageUrl={myEventsSrc.bgImage}
          logo={myEventsSrc.logoBanner}
        />
        <article id='articleMyEvents'>
          <div id='myEventsDiv'>
            <h2>My Events</h2>
            <div id='myEventsList'>
              {!userInfo.attendingEvents ||
              userInfo.attendingEvents.length === 0 ? (
                <p>You haven't signed up for any events yet!</p>
              ) : (
                <ul>
                  {userInfo.attendingEvents.map((attendingEvent) => (
                    <li key={attendingEvent._id}>
                      <EventLocationCard event={attendingEvent} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </article>
      </section>{' '}
    </>
  )
}

export default MyEvents
