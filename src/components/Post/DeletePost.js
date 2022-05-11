import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useHttpClient from '../../hooks/useHttpClient'
import DeletionModal from '../Modal/DeletionModal'
import ErrorModal from '../Modal/ErrorModal'

export const DeletePost = ({ authorId }) => {
  const { sendReq, error, clearError } = useHttpClient()
  const navigate = useNavigate()
  const { titleURL, postId } = useParams()
  const { currentUser } = useAuth()
  const currentUserId = currentUser && currentUser.id
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false)
  }

  const confirmDeleteWarningHandler = () => {
    handleDelete()
  }

  const handleDelete = async () => {
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts/${titleURL}/${postId}`,
        'DELETE',
        JSON.stringify({ author: currentUserId }),
        {
          'Content-Type': 'application/json'
        }
      )
      navigate('/')
    } catch (err) {}
  }
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />

      <DeletionModal
        onClose={() => setShowConfirmModal(false)}
        show={showConfirmModal}
        cancelDeleteHandler={cancelDeleteWarningHandler}
        confirmDeleteHandler={confirmDeleteWarningHandler}
      />
      {currentUserId === authorId && (
        <button className="btn auth__delete" onClick={showDeleteWarningHandler}>
          Delete Post
        </button>
      )}
    </>
  )
}
