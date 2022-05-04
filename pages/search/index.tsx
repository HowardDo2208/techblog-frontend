import { API_URL } from '../../constants'
import { Fragment, useEffect, useState } from 'react'
import Navbar from '../../components/layout/navbar'
import { Box, Grid } from '@chakra-ui/react'
import Container from '../../components/layout/container'
import Meta from '../../components/layout/meta'
import { useRouter } from 'next/router'
import SearchSideBar from '../../components/search/SearchSideBar'
import SearchResults from '../../components/search/SearchResults'

export type SearchTargets = 'posts' | 'users'

const SearchPage = () => {
  const router = useRouter()
  const { _q } = router.query
  const [posts, setPosts] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [target, setTarget] = useState('posts')

  const fetchSearchResult = async () => {
    if (_q) {
      const result = await (
        await fetch(`${API_URL}/search/${target}?_q=${_q}`)
      ).json()
      if (target === 'posts') {
        setPosts(result)
        setUsers([])
      } else {
        setUsers(result)
        setPosts([])
      }
    }
  }

  useEffect(() => {
    fetchSearchResult()
  }, [_q, target])

  return (
    <Fragment>
      <Meta />
      <Navbar />
      <Box as="main" bg="#EEF0F1" id="page" mt="56px">
        <Container>
          <Grid
            templateColumns={{
              base: '1fr',
              md: '1fr 3fr',
              lg: '1fr 3fr 1.5fr',
            }}
            d={{ base: 'block', md: 'grid' }}
            gap={4}
            pt="4"
          >
            <SearchSideBar target={target} setTarget={setTarget} />
            <SearchResults posts={posts} users={users} />
          </Grid>
        </Container>
      </Box>
    </Fragment>
  )
}

export default SearchPage

