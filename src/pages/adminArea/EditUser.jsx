import { useLocation } from 'react-router-dom'
import React from 'react'
import UpdateInfoUser from '../../components/Forms/updateInfoProfile/UpdateInfoUser'
import Banner from '../../components/Layout/banner/Banner'
import './EditUser.css'

const EditUser = () => {
  const location = useLocation()
  const user = location.state?.user

  return (
    <section id='editUserAdminArea'>
      <Banner
        className={'backgroundEditUserAdminAera'}
        imageUrl={'/images/adminAreaBg.jpeg'}
        logo={'/images/adminLogo.png'}
      />
      <article id='articleEditUserAdminArea'>
        <UpdateInfoUser user={user} />
      </article>
    </section>
  )
}

export default EditUser
