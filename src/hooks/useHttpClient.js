import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  //what if the req is on the way and when we switch the page =>
  //we're trying to update state on a component that has unmounted => error
  //we need to cancel the ongoing http req

  //reference: piece of data that will not be re-initialized (remains unchanged)

  //wrapped sendReq in a 'useCallback' hook to prevent it from being re-created every render
  //and avoid infinite loops
  const sendReq = useCallback(
    async (url, method = 'GET', body = null, headers = {}, credentials) => {
      if (method === 'GET') {
        setIsLoading(true)
      }
      //add the AbortController API to activeHttpReqs array
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          credentials
        })
        const responseData = await response.json() //parse the response body

        if (!response.ok) {
          //400 or 500 status code
          throw new Error(responseData.message)
        }
        setIsLoading(false)
        return responseData //for our component
      } catch (err) {
        setError(err.message || 'Something went wrong...')
        setIsLoading(false)
        throw err
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  return { isLoading, error, sendReq, clearError, setError }
}

export default useHttpClient
