import { createContext } from 'react';

export const AuthContext = createContext({
  currentUser: {},
  logout: () => {},
  userId: '',
  doesSessionExist: false
});
