import { useContext } from 'react'
import queryString from 'query-string'
import { useHttpClient } from './useHttpClient'
import { SearchContext } from '../context/search'
import { useNavigate } from 'react-router-dom'

const useSearch = () => {
  const { setSearchValue, setSearchResults } = useContext(SearchContext)

  const { sendReq } = useHttpClient()
  const navigate = useNavigate()

  const search = async (value) => {
    if (value) {
      setSearchValue(value)
      try {
        const data = await list({ search: value || undefined })
        setSearchResults(data)
        navigate(`/search/?q=${value}`)
      } catch (err) {
        console.log(err)
      }
    } else {
      setSearchResults([])
    }
  }

  const list = async (params) => {
    const query = queryString.stringify(params)
    try {
      const responseData = await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts/search?${query}`
      )
      return responseData.posts
    } catch (err) {
      console.log(err)
    }
  }
  return { search }
}

export default useSearch

