import React, { useEffect, useState } from 'react'
import Button from '../../components/UI/button/Button'
import Card from '../../components/UI/card/homeCard/Card'
import { homeSrc, homeText } from '../../constants/homeConstants'
import './Home.css'
import { useModalContext } from '../../context/ModalContext'
import { useAuthContext } from '../../context/AuthContext'
import { API } from '../../utils/api/api'
import NoUserDOM from '../../components/Forms/homeElements/noUserDOM'
import UserDom from '../../components/Forms/homeElements/UserDom'

const Home = () => {
  const { openLogin } = useModalContext()
  const { user } = useAuthContext()
  const [randomEvents, setRandomEvents] = useState([])
  const [numberOfEvents, setNumberOfEvents] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        const result = await API({
          endpoint: '/events',
          method: 'GET'
        })

        let threeRandomEvents = []
        for (let i = 0; i < 3; i++) {
          const index = Math.floor(Math.random() * result.data.length)
          threeRandomEvents.push(result.data[index])
        }
        setNumberOfEvents(result.data.length)
        setRandomEvents(threeRandomEvents)
      }
    }
    fetchEvents()
  }, [user])

  return (
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
            <UserDom events={randomEvents} eventsNumber={numberOfEvents} />
          ) : (
            <NoUserDOM fnc={openLogin} />
          )}
        </article>
      </section>
    </main>
  )
}

export default Home
