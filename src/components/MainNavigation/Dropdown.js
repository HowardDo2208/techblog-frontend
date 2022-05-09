import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dropdown = ({ showMenu, currentUser, handleLogout }) => {
  const navigate = useNavigate();
  const handleRedirect = useCallback((url) => navigate(url), [navigate]);
  const currentUserEmail = currentUser && currentUser.email;

  return (
    <div className={showMenu ? 'dropdown' : 'dropdown--close'}>
      <ul className="dropdown__list">
        <li className="list__item hvr-bg-lt">
          <button
            onMouseDown={() => handleRedirect(`/users/${currentUser && currentUser.id}`)}
            className="btn dropdown__btn"
            to={`/users/${currentUser && currentUser.id}`}>
            <div>{currentUser && currentUser.name}</div>
            <small className="u-name-id">
              {currentUserEmail && currentUserEmail.split('.')[0]}
            </small>
          </button>
        </li>
        <li className="list__item hvr-bg-lt">
          <button className="btn dropdown__btn" onMouseDown={() => handleRedirect('/posts/new')}>
            Create Post
          </button>
        </li>
        <li className="list__item hvr-bg-lt">
          <button
            className="btn dropdown__btn"
            onMouseDown={() =>
              handleRedirect(`/users/${currentUser && currentUser.id}/readinglist`)
            }>
            Reading List
          </button>
        </li>
        <li className="list__item hvr-bg-lt">
          <button
            className="btn dropdown__btn"
            onMouseDown={() => handleRedirect(`/users/${currentUser && currentUser.id}/edit`)}>
            Edit Profile
          </button>
        </li>
        <li className="list__item hvr-bg-lt">
          <button className="btn dropdown__btn" onMouseDown={handleLogout}>
            Signout
          </button>
        </li>
      </ul>
    </div>
  );
};
