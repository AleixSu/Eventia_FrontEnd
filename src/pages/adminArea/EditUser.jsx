import { useLocation } from 'react-router-dom'
import React from 'react'
import UpdateInfoUser from '../../components/Forms/updateInfoProfile/UpdateInfoUser'
import Banner from '../../components/Layout/banner/Banner'
import './EditUser.css'
import { Helmet } from 'react-helmet-async'

const EditUser = () => {
  const location = useLocation()
  const user = location.state?.user

  return (
    <>
      <Helmet>
        <title>Edit User | EventHub</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <section id='editUserAdminArea'>
        <Banner
          className={'backgroundEditUserAdminAera'}
          imageUrl={'/images/adminAreaBg.jpeg'}
          logo={'/images/adminLogo.png'}
        />
        <article id='articleEditUserAdminArea'>
          <UpdateInfoUser user={user} />
        </article>
      </section>{' '}
    </>
  )
}

export default EditUser
