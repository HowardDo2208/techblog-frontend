import React, { useContext } from 'react'
import { useHttpClient } from '../../hooks/useHttpClient'
import useForm from '../../hooks/useForm'
import { newPostForm } from '../../utils/formConfig'
import { appendData, renderRepeatedSkeletons } from '../../utils'
import ErrorModal from '../../components/Modal/ErrorModal'
import SkeletonElement from '../../components/Skeleton/SkeletonElement'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Layout from '../../components/Layout/Layout'

const NewPost = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { currentUser } = auth
  const { isLoading, sendReq, error, clearError } = useHttpClient()
  const { renderFormInputs, renderFormValues, isFormValid } = useForm(newPostForm)
  const formValues = renderFormValues()
  const formInputs = renderFormInputs()

  const postSubmitHandle = async (evt) => {
    evt.preventDefault()
    const formData = appendData(formValues)
    formData.append('author', currentUser.id)
    try {
      await sendReq(`${process.env.REACT_APP_BASE_URL}/posts`, 'POST', formData)
      navigate('/')
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <Layout>
      <ErrorModal error={error} onClose={clearError} />
      {isLoading ? (
        renderRepeatedSkeletons(<SkeletonElement type="text" />, 20)
      ) : (
        <div className="container-create-page">
          <form className="form form__create">
            <h2>Create a new post</h2>
            {formInputs}
            <button onClick={postSubmitHandle} className="btn" disabled={!isFormValid()}>
              Submit <span>&rarr;</span>
            </button>
          </form>
        </div>
      )}
    </Layout>
  )
}

export default NewPost
