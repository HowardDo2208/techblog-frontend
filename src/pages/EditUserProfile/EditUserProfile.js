import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useHttpClient } from '../../hooks/useHttpClient'
import { AuthContext } from '../../context/auth'
import useForm from '../../hooks/useForm'
import ErrorModal from '../../components/Modal/ErrorModal'
import SkeletonForm from '../../components/Skeleton/SkeletonForm'

import { editProfileForm, prefillEditProfileForm } from '../../utils/formConfig'
import { appendData } from '../../utils'
import Layout from '../../components/Layout/Layout'
import useAuth from '../../hooks/useAuth'

const EditUserProfile = () => {
  const [user, setUser] = useState()
  const { renderFormInputs, renderFormValues, setForm } = useForm(editProfileForm)
  const navigate = useNavigate()
  const { sendReq, isLoading, error, clearError } = useHttpClient()
  const { userId } = useParams()
  const { currentUser, setCurrentUser } = useAuth()
  let formValues = renderFormValues()
  let formInputs = renderFormInputs()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendReq(`${process.env.REACT_APP_BASE_URL}/users/${userId}`)
        // if (currentUser.userId !== responseData.user.id) {
        //   history.push("/");
        // }
        prefillEditProfileForm(responseData)
        setUser(responseData)
        setForm(editProfileForm)
      } catch (err) {
        console.log('err', err)
      }
    }
    fetchUser()
  }, [sendReq, userId, setForm, currentUser, navigate])

  const infoSubmitHandle = async (evt) => {
    evt.preventDefault()
    const formData = appendData(formValues)
    try {
      const responseData = await sendReq(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
        'PATCH',
        formData
      )
      const { name, bio, email, avatar } = responseData
      setCurrentUser({ ...currentUser, name, bio, email, avatar })
      navigate(`/users/${userId}`)
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <Layout>
      <ErrorModal error={error} onClose={clearError} />
      <div className="container-edit-page">
        {isLoading ? (
          <SkeletonForm />
        ) : (
          <form className="form form__edit" onSubmit={infoSubmitHandle}>
            <h2>Edit Profile</h2>
            {!isLoading && user && formInputs}
            <button onClick={infoSubmitHandle} className="btn btn-submit">
              Update Profile
            </button>
          </form>
        )}
      </div>
    </Layout>
  )
}

export default EditUserProfile
