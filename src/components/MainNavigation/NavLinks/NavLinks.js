import React, { useContext } from 'react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { LoggedInNavLinks } from './LoggedInNavLinks';
import { GuestNavLinks } from './GuestNavLinks';
import { AuthContext } from '../../../context/auth';
import useAuth from '../../../hooks/useAuth';

const NavLinks = ({ onSearchIconClick, unreadNotifications, setUnreadNotifications }) => {
  let { doesSessionExist, userId, currentUser, logout } = useAuth();

  const handleSearchClick = () => {
    onSearchIconClick();
  };

  return (
    <ul className="nav__list">
      <li>
        <i className="search-icon">
          <FiSearch size="2.5rem" onClick={handleSearchClick} />
        </i>
      </li>

      {doesSessionExist ? (
        <LoggedInNavLinks
          unreadNotifications={unreadNotifications}
          setUnreadNotifications={setUnreadNotifications}
          currentUser={currentUser}
          logout={logout}
        />
      ) : (
        <GuestNavLinks loginFirst={true} />
      )}
    </ul>
  );
};

export default NavLinks;
