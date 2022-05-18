import { RiNotificationLine } from '@react-icons/all-files/ri/RiNotificationLine'
import React, { useState, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { DEFAULT_AVATAR } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import Avatar from '../../Avatar/Avatar'
import { Dropdown } from '../Dropdown'

export const LoggedInNavLinks = ({ unreadNotifications, setUnreadNotifications, logout }) => {
  const navigate = useNavigate()
  const handleRedirect = (url) => navigate(url)
  const [showMenu, setShowMenu] = useState(false)
  const { userId, currentUser } = useAuth()

  const handleClick = () => {
    setUnreadNotifications([])
    handleRedirect(`/users/${userId}/notifications`)
  }

  const handleDropdown = () => {
    setShowMenu((showMenu) => !showMenu)
  }

  const handleLogout = () => {
    setShowMenu(false)
    logout()
  }
  return (
    <React.Fragment>
      <li className="list__item list__item--mobile item--create">
        <NavLink className="create-link" to="/posts/new">
          Create Post
        </NavLink>
      </li>
      {/* <li className="list__item list__item--notifs hvr-bg-lt" onClick={handleClick}>
        <NavLink className="link" to={`/users/${userId}/notifications`} exact>
          <div className="link--notifs-icon">
            <RiNotificationLine size="2.5rem" />
            {unreadNotifications && unreadNotifications.length > 0 && (
              <div className="notif__counter">{unreadNotifications.length}</div>
            )}
          </div>
        </NavLink>
      </li> */}

      <li>
        <button className="btn nav__btn" onClick={handleDropdown} onBlur={() => setShowMenu(false)}>
          <Avatar src={currentUser?.avatar ?? DEFAULT_AVATAR} />
        </button>
      </li>

      <Dropdown
        showMenu={showMenu}
        handleLogout={handleLogout}
        setShowMenu={setShowMenu}
        currentUser={currentUser}
      />
    </React.Fragment>
  )
}
