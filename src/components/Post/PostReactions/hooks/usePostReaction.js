import { useContext, useState } from 'react';
import { checkInArray } from '../../../../utils';
import useHttpClient from '../../../../hooks/useHttpClient';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const usePostReaction = (likes, unicorns, bookmarks, id, author) => {
  const { userId, accessTokenPayload } = useSessionContext();

  const { sendReq } = useHttpClient();

  const [state, setState] = useState({
    isLiked: checkInArray(likes, userId),
    isUnicorned: checkInArray(unicorns, userId),
    isBookmarked: checkInArray(bookmarks, userId)
  });

  const reactOnPost = async (action, postId) => {
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}/${action}`,
        'PUT',
        JSON.stringify({ userId, postId }),
        {
          'Content-Type': 'application/json'
        }
      );
    } catch (err) {}
  };

  const updateReactionArr = (arr, effect) => {
    if (effect === 'negative') {
      arr.splice(arr.indexOf(userId), 1);
    } else {
      arr.push(userId);
    }
  };

  const handleReaction = async (action, effect, arr, stateKey) => {
    updateReactionArr(arr, effect);
    setState((state) => ({ ...state, [stateKey]: !state[stateKey] }));
    reactOnPost(action, id);
  };

  return {
    state,
    handleReaction
  };
};

export default usePostReaction;
