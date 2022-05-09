import { useNavigate } from 'react-router-dom';
import { useHttpClient } from './useHttpClient';
import { useState, useEffect } from 'react';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { sendReq } = useHttpClient();
  const navigate = useNavigate();
  const { userId, doesSessionExist } = useSessionContext();
  async function logout() {
    await signOut();
    localStorage.removeItem('currentUser');
    navigate('/');
  }

  const fetchCurrentUser = async () => {
    try {
      console.log('before fetch');
      const responseData = await sendReq(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
        'GET',
        null,
        {}
      );
      localStorage.setItem('currentUser', JSON.stringify(responseData));
      setCurrentUser(responseData.user);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setCurrentUser(currentUser);
    } else if (userId) {
      console.log('hey');
      fetchCurrentUser();
    }
  }, [userId]);

  return { currentUser, logout, userId, doesSessionExist };
};

export default useAuth;
