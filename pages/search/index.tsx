import { API_URL } from '../../constants'
import { Fragment, useEffect, useState } from 'react'
import Navbar from '../../components/layout/navbar'
import { Box, Grid } from '@chakra-ui/react'
import Sidebar from '../../components/layout/sidebar'
import Container from '../../components/layout/container'
import Listing from '../../components/listing'
import Posts from '../../components/feed/posts'
import Meta from '../../components/layout/meta'
import { useRouter } from 'next/router'

const SearchPage = () => {
  const router = useRouter()
  const { _q } = router.query
  const [posts, setPosts] = useState<any[]>()

  const fetchSearchResult = async () => {
    const result = await (
      await fetch(`${API_URL}/posts/search?_q=${_q}`)
    ).json()
    if (result) {
      setPosts(result.posts || [])
    }
  }

  useEffect(() => {
    fetchSearchResult()
  }, [_q])

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
            <Sidebar d={{ base: 'none', md: 'block' }} />
            <Posts />
          </Grid>
        </Container>
      </Box>
    </Fragment>
  )
}

export default SearchPage

