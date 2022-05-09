import React from 'react';
import { NavLink } from 'react-router-dom';

export const GuestNavLinks = (props) => {
  return (
    <React.Fragment>
      <li className="list__item item--create">
        <NavLink className="create-link" to="/auth">
          Login/ Create Account
        </NavLink>
      </li>
    </React.Fragment>
  );
};
