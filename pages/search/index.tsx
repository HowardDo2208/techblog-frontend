import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import { API_URL } from '../../constants'
import FeaturedPost from '../../components/FeaturedPost'

const SearchPage = () => {
  const router = useRouter()
  const { _q } = router.query
  const [posts, setPosts] = useState<any[]>()
  const [users, setUsers] = useState<any[]>()

  const fetchSearchResult = async () => {
    const result = await (await fetch(`${API_URL}/search?_q=${_q}`)).json()
    if (result) {
      setPosts(result.posts || [])
      setUsers(result.users || [])
    }
  }

  useEffect(() => {
    fetchSearchResult()
  }, [_q])
  return (
    <Layout>
      <h1>Search result:</h1>
      {posts &&
        posts.length > 0 &&
        posts.map((post: any) => (
          <FeaturedPost key={`post ${post.id}`} post={post} />
        ))}
      {users &&
        users.length > 0 &&
        users.map((user: any) => <div key={user.id}>{user.email}</div>)}
    </Layout>
  )
}

export default SearchPage

