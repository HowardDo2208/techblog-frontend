import React, { useContext, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useHttpClient from '../../hooks/useHttpClient'
import { checkInArray } from '../../utils'
import './FollowUser.css'

export const FollowUser = ({ followId, setShowModal, followers, userToFollow }) => {
  const { currentUser } = useAuth()
  const currentUserId = currentUser && currentUser.id
  const { sendReq } = useHttpClient()

  const [following, setFollowing] = useState(false)

  useEffect(() => {
    setFollowing(checkInArray(followers, currentUserId))
  }, [followers, currentUserId])

  const handleFollow = () => {
    console.log('currentuser', currentUser)
    !currentUserId ? setShowModal(true) : followUser(followId)
  }

  const followUser = async (followId) => {
    let action = following ? 'unfollow' : 'follow'
    setFollowing((following) => !following)

    const reqData = { userId: currentUserId, followId }
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/users/${action}`,
        'PUT',
        JSON.stringify(reqData),
        {
          'Content-Type': 'application/json'
        }
      )
      //redirect user to the landing page
    } catch (err) {}
  }
  return (
    <button
      className={`btn--profile-cta ${following ? 'btn-following' : ''}`}
      onClick={handleFollow}>
      {following ? 'Following' : 'Follow'}
    </button>
  )
}
