import Banner from '../../components/Layout/banner/Banner'
import EventLocationCard from '../../components/UI/card/eventCard/EventLocationCard'
import { myEventsSrc } from '../../constants/myEventsConstants'
import { useAuthContext } from '../../context/AuthContext'
import { API } from '../../utils/api/api'
import './MyEvents.css'

import React, { useEffect, useState } from 'react'

const MyEvents = () => {
  const { user } = useAuthContext()
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true)
        const response = await API({ endpoint: `/users/${user._id}` })

        if (response.status === 200) {
          setUserInfo(response.data)
        } else {
          setError('Error loading user info')
        }
      } catch (err) {
        setError('Error loading user info')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (user?._id) {
      fetchUserInfo()
    }
  }, [user])

  if (loading) return <div>Loading...</div>
  if (error) return <div className='error'>{error}</div>
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
