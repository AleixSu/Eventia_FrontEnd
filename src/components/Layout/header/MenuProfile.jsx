import React, { useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../../UI/button/Button'
import { useAuthContext } from '../../../context/AuthContext'
import './MenuProfile.css'

const MenuProfile = ({ isOpen, closeMenu }) => {
  const { user, logOut } = useAuthContext()
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, closeMenu])

  const handleLogOut = () => {
    logOut()
    closeMenu()
    navigate('/')
  }

  return (
    <div id='profileMenuDiv' className={isOpen ? '' : 'hidden'} ref={menuRef}>
      <ul id='profileMenuUl'>
        <li>
          <NavLink to='/profile' onClick={closeMenu}>
            My profile
          </NavLink>
        </li>
        <li>
          <NavLink to='/my_events' onClick={closeMenu}>
            My events
          </NavLink>
        </li>
        {user.role === 'admin' && (
          <li>
            <NavLink to='/admin_area' onClick={closeMenu}>
              Admin area
            </NavLink>
          </li>
        )}
        <li>
          <Button
            className={'logOutOption'}
            text='Log Out'
            fnc={handleLogOut}
          />
        </li>
      </ul>
    </div>
  )
}

export default MenuProfile
