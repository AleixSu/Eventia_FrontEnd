import React, { useEffect, useState } from 'react'
import { homeSrc, homeText } from '../../../constants/homeConstants'
import './UserDom.css'
import HomeEventCard from '../../UI/card/homeEventCard/HomeEventCard'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { NavLink } from 'react-router-dom'

const UserDom = ({ events, eventsNumber }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    events[0] ? setLoading(false) : setLoading(true)
  }, [events])
  return (
    <div id='userDomDiv'>
      <div id='wellcome'>
        <h5>{homeText.wellcomeTextBlack1} </h5>
        <h5 className='keyWord'>{homeText.wellcomeTextColour}</h5>
      </div>

      <div id='wellcomeDiv'>
        <div id='browseDiv'>
          <p>{homeText.wellcomeIntroText}</p>
          {loading ? (
            <div id='homeLoadingDiv'>
              <LoadingIcon size={50} borderSize={4} />
            </div>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event._id}>
                  <HomeEventCard event={event} />
                </li>
              ))}
            </ul>
          )}
          <div className='exploreSection'>
            <p className='exploreTitle'>Explore More</p>
            <NavLink to={'Events'} className={'exploreLink'}>
              {eventsNumber} Featured Events Await
            </NavLink>
          </div>
          <img src={homeSrc.logoWellcome} alt='logoImgWelcome' />
        </div>
      </div>
    </div>
  )
}

export default UserDom
