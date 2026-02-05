import React from 'react'
import Banner from '../../components/Layout/banner/Banner'
import { myProfileSrc } from '../../constants/myProfileConstants'
import './MyProfile.css'
import UpdateInfoProfile from '../../components/Forms/updateInfoProfile/UpdateInfoProfile'
import { Helmet } from 'react-helmet-async'

const MyProfile = () => {
  return (
    <>
      <Helmet>
        <title>My Profile | EventHub</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <section id='profile'>
        <Banner className={'background'} logo={myProfileSrc.logoBanner} />
        <article id='articleProfileInfo'>
          <UpdateInfoProfile />
        </article>
      </section>{' '}
    </>
  )
}

export default MyProfile
