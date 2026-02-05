import EventsList from '../../components/Forms/EventsList/EventsList'
import FilterBox from '../../components/Forms/filterBox/FilterBox'
import SearchBox from '../../components/Forms/searchBox/SearchBox'
import Banner from '../../components/Layout/banner/Banner'
import { locationsSrc } from '../../constants/locationConstants'
import './Event.css'
import React from 'react'
import { Helmet } from 'react-helmet-async'

const Event = () => {
  return (
    <>
      <Helmet>
        <title>Browse Events | EventHub</title>
        <meta
          name='description'
          content='Explore events worldwide. Filter by country or name. Find your next experience.'
        />
        <link rel='canonical' href={`${import.meta.env.VITE_APP_URL}/events`} />
      </Helmet>
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
    </>
  )
}

export default Event
