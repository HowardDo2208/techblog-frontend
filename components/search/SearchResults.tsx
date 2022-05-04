import { Box, Button } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { PostCard } from '../feed/posts'
import SkeletonCards from '../feed/skeleton'
import UserCard from '../UserCard'

const HeaderBtn = styled(Button)`
  position: relative;
  padding: 0.4rem 0.5rem;
  font-weight: normal;

  &:hover {
    color: #3b49df;

    &::after {
      width: 100%;
    }
  }

  &:focus {
    box-shadow: none;
  }

  ${(props) =>
    props.isCurrent &&
    css`
      font-weight: 500;

      &::after {
        transition: width 0.2s ease;
        position: absolute;
        bottom: 0;
        margin: auto;
        content: '';
        height: 3px;
        width: 70%;
        border-radius: 4px;
        background-color: #3b49df;
      }
    `}
`
const SearchResults = ({ posts, users }: any) => {
  if (posts.length === 0 && users.length === 0) {
    return <h1>No result</h1>
  }

  return (
    <Box mb="8" borderRadius="md">
      {posts.length > 0 &&
        posts.map((post: any, idx: number) => (
          <PostCard
            key={post.id}
            title={post.title}
            // username={post.user.name}
            tagList={post.tag_list}
            // readingTime={post.reading_time}
            // commentCount={post.comments_count}
            // reactionCount={post.public_reactions_count}
            // postLink={`https://dev.to${post.path}`}
            // publishedDate={post.readable_publish_date}
            // userProfile={post.user.profile_image_url}
            // headerImage={idx === 0 ? post.main_image : ''}
          />
        ))}
      {users.length > 0 &&
        users.map((user: any) => <UserCard email={user.email} />)}
    </Box>
  )
}

export default SearchResults

