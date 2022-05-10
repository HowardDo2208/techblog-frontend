import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHttpClient } from '../../hooks/useHttpClient'
import PostList from '../../components/PostList/PostList'
import ErrorModal from '../../components/Modal/ErrorModal'
import { FollowUser } from '../../components/FollowUser/FollowUser'
import AuthModal from '../../components/Modal/AuthModal'
import Avatar from '../../components/Avatar/Avatar'
import { UserInfo } from '../../components/User/UserInfo/UserInfo'
import { UserSideBar } from '../../components/User/UserSideBar/UserSideBar'
import SkeletonElement from '../../components/Skeleton/SkeletonElement'
import { renderRepeatedSkeletons } from '../../utils'
import Shimmer from '../../components/Skeleton/Shimmer'
import useAuth from '../../hooks/useAuth'
import Layout from '../../components/Layout/Layout'

const UserProfile = () => {
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { isLoading, sendReq, error, clearError } = useHttpClient()
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const currentUserId = currentUser && currentUser.id

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendReq(`${process.env.REACT_APP_BASE_URL}/users/${userId}`)
        console.log('res', responseData)
        setUser(responseData)
        setPosts(responseData.posts)
      } catch (err) {
        console.log('err', err)
      }
    }
    fetchUser()
  }, [sendReq, userId])

  return (
    <Layout>
      <ErrorModal error={error} onClose={clearError} />
      <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      {user && (
        <div className="container-layout container-user">
          <div className="user__main">
            <Avatar src={user.avatar} isLoading={isLoading} />
            <div className="main__cta">
              <h2>{user.name}</h2>
              {userId === currentUserId ? (
                <Link
                  className="btn btn--profile-cta btn--profile-edit"
                  to={`/users/${userId}/edit`}>
                  Edit Profile
                </Link>
              ) : (
                <FollowUser
                  followId={user.id}
                  followers={user.followers}
                  userToFollow={user}
                  setShowModal={setShowModal}
                />
              )}
            </div>
            {isLoading ? (
              <>
                {renderRepeatedSkeletons(<SkeletonElement type="text" />, 2)}
                <Shimmer />
              </>
            ) : (
              <UserInfo user={user} />
            )}
          </div>
          <div className="user__content">
            <UserSideBar user={user} />
            <div className="wrapper__user--posts">
              <PostList
                cover={false}
                items={posts}
                author={user}
                isLoading={Boolean(!user.avatar)}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default UserProfile
