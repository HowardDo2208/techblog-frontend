import { useNavigate } from 'react-router-dom';
import { useHttpClient } from './useHttpClient';
import { useState, useEffect } from 'react';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { sendReq } = useHttpClient();
  const { userId, doesSessionExist } = useSessionContext();
  const navigate = useNavigate();

  async function logout() {
    await signOut();
    navigate('/');
  }

  useEffect(() => {
    if (userId) {
      const fetchCurrentUser = async () => {
        try {
          const responseData = await sendReq(
            `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
            'GET',
            null,
            {}
          );
          setCurrentUser(responseData.user);
        } catch (err) {}
      };
      fetchCurrentUser();
    }
  }, [userId]);

  return { currentUser, logout, userId, doesSessionExist };
};

export default useAuth;
