import EventsList from '../../components/Forms/EventsList/EventsList'
import FilterBox from '../../components/Forms/filterBox/FilterBox'
import SearchBox from '../../components/Forms/searchBox/SearchBox'
import Banner from '../../components/Layout/banner/Banner'
import { locationsSrc } from '../../constants/locationConstants'
import './Event.css'
import React from 'react'

const Event = () => {
  return (
    <main id='main'>
      <section id='event'>
        <Banner
          imageUrl={'./images/eventsBg.jpg'}
          logo={locationsSrc.logoBanner}
        />
        <article id='articleEvents'>
          <h2>EVENTS</h2>
          <div className='searchBoxDiv'>
            <SearchBox />
          </div>
          <div id='eventsDiv'>
            <FilterBox />
            <EventsList />
          </div>
        </article>
      </section>
    </main>
  )
}

export default Event
