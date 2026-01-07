import React from 'react'
import Button from '../../components/UI/button/Button'
import Card from '../../components/UI/card/homeCard/Card'
import { homeSrc, homeText } from '../../constants/homeConstants'
import './Home.css'
import { useModalContext } from '../../context/ModalContext'

const Home = () => {
  const { openLogin } = useModalContext()

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
          <div id='joinUs'>
            <h5>{homeText.joinUsTextBlack1}</h5>
            <h5 className='keyWord'>{homeText.joinUsTextColour}</h5>
            <h5>{homeText.joinUsTextBlack2}</h5>
          </div>
          <div id='memberDiv'>
            <div id='benefitsDiv'>
              <h6>{homeText.benefitsTitle}</h6>
              <ul>
                {homeText.userBenefits.map((benefit, index) => (
                  <li key={index}>
                    <p>{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
            <img src={homeSrc.logoImgMember} alt='logoImgMember' />
          </div>
          <Button
            text={'Register Now'}
            className={'registerButton'}
            fnc={openLogin}
          />
        </article>
      </section>
    </main>
  )
}

export default Home
