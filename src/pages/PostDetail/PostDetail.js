import React, { useState, useEffect } from 'react'
import { useHttpClient } from '../../hooks/useHttpClient'
import { useParams } from 'react-router-dom'
import PostReactions from '../../components/Post/PostReactions/PostReactions'
import PostContent from '../../components/Post/PostContent/PostContent'
import PostAuthor from '../../components/Post/PostAuthor/PostAuthor'
import ErrorModal from '../../components/Modal/ErrorModal'
import AuthModal from '../../components/Modal/AuthModal'
import { SkeletonPage } from '../../components/Skeleton/SkeletonPage'
import Layout from '../../components/Layout/Layout'

const PostDetail = (props) => {
  const [post, setPost] = useState()
  const { isLoading, sendReq, error, clearError } = useHttpClient()
  const { postId, slug } = useParams()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendReq(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`)
        setPost(responseData)
      } catch (err) {
        console.log('err', err)
      }
    }
    fetchPost()
  }, [slug, postId])

  return (
    <Layout>
      {isLoading && <SkeletonPage />}
      <ErrorModal error={error} onClose={clearError} />
      {!isLoading && post && (
        <div className="container-layout-post">
          <PostReactions post={post} setShowModal={setShowModal} />
          <AuthModal onClose={() => setShowModal(false)} show={showModal} />
          <div className="container-post">
            <PostContent post={post} />
            <PostAuthor setShowModal={setShowModal} author={post.author} isLoading={isLoading} />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default PostDetail
