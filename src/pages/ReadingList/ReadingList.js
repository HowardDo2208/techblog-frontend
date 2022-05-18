import React, { useState, useEffect } from 'react'
import ErrorModal from '../../components/Modal/ErrorModal'
import useHttpClient from '../../hooks/useHttpClient'
import PostList from '../../components/PostList/PostList'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

const ReadingList = () => {
  const [loadedPosts, setLoadedPosts] = useState([])
  const { isLoading, sendReq, error, clearError } = useHttpClient()
  const { currentUser } = useAuth()
  const { userId } = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}/bookmarks`,
          'GET',
          null
        )
        setLoadedPosts(responseData)
      } catch (err) {}
    }
    fetchPosts()
  }, [sendReq, userId, currentUser])
  return (
    <Layout>
      <ErrorModal error={error} onClose={clearError} />
      <div className="container-posts reading-list">
        <h2 className="reading-list__heading">
          {currentUser && `${currentUser.name}'s Reading list`}
        </h2>

        {loadedPosts ? (
          <PostList cover={false} items={loadedPosts} isLoading={isLoading} />
        ) : (
          <p>Your reading list is empty!</p>
        )}
      </div>
    </Layout>
  )
}

export default ReadingList
