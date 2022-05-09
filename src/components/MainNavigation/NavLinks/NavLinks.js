import React, { useContext } from 'react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { LoggedInNavLinks } from './LoggedInNavLinks';
import { GuestNavLinks } from './GuestNavLinks';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

const NavLinks = ({ onSearchIconClick, unreadNotifications, setUnreadNotifications }) => {
  let { doesSessionExist, userId, accessTokenPayload } = useSessionContext();

  const handleSearchClick = () => {
    onSearchIconClick();
  };

  async function logout() {
    await signOut();
    window.location.href = '/';
  }

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
          currentUser={accessTokenPayload}
          logout={logout}
        />
      ) : (
        <GuestNavLinks loginFirst={true} />
      )}
    </ul>
  );
};

export default NavLinks;
