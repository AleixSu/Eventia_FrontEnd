import React, { useMemo, useState } from 'react'
import Button from '../../components/UI/button/Button'
import Card from '../../components/UI/card/homeCard/Card'
import { homeSrc, homeText } from '../../constants/homeConstants'
import './Home.css'
import { useModalContext } from '../../context/ModalContext'
import { useAuthContext } from '../../context/AuthContext'
import NoUserDOM from '../../components/Forms/homeElements/NoUserDOM'
import UserDom from '../../components/Forms/homeElements/UserDom'
import { Helmet } from 'react-helmet-async'
import { useGetEvents } from '../../utils/api/queries/events/useGetEvents'

const Home = () => {
  const { openLogin } = useModalContext()
  const { user } = useAuthContext()

  const { data: events = [] } = useGetEvents(!!user)

  const randomEvents = useMemo(() => {
    if (!events.length) return []

    const threeRandomEvents = []
    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * events.length)
      threeRandomEvents.push(events[index])
    }

    return threeRandomEvents
  }, [events])

  return (
    <>
      <Helmet>
        <title>EventHub - Discover Events Worldwide</title>
        <meta
          name='description'
          content='Join thousands of people at exciting events. Browse festivals, conferences, and local meetups.'
        />
        <link rel='canonical' href={`${import.meta.env.VITE_APP_URL}/`} />
      </Helmet>
      <main className='main'>
        <section id='home'>
          <div className='video-container'>
            <video
              src='/videos/bgVideo.mp4'
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
          <div id='logoDiv'>
            <img id='logoImg' src={homeSrc.frontPageLogo} alt='logoImg' />
            <h4>{homeText.sloganBlack} </h4>
            <h4 className='keyWord'>{homeText.sloganColour} </h4>
            <Button
              text={"Let's Begin"}
              className={'startButton'}
              fnc={() => {
                document.getElementById('articleIntro').scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
                console.log(events.data)
              }}
            />
          </div>
          <article id='articleIntro'>
            <h3>{homeText.introTitle} </h3>
            <div id='cardDiv'>
              <Card
                text={'Places'}
                src={homeSrc.cardPlacesUrl}
                pathTo={'Locations'}
              />
              <Card
                text={'Events'}
                src={homeSrc.cardEventsUrl}
                pathTo={'Events'}
              />
              <Card text={'People'} src={homeSrc.cardPeopleUrl} />
            </div>
            <div id='eventiaText'>
              <p>{homeText.introText} </p>
            </div>
            {user ? (
              <UserDom events={randomEvents} eventsNumber={events.length} />
            ) : (
              <NoUserDOM fnc={openLogin} />
            )}
          </article>
        </section>
      </main>
    </>
  )
}

export default Home
