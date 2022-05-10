import React, { useEffect } from 'react'
import PostPreview from '../PostPreview/PostPreview'
import SkeletonPostList from '../Skeleton/SkeletonPostList'
import './PostList.css'

const PostList = (props) => {
  const { items, isLoading } = props

  return (
    <div className="container container-posts">
      {isLoading && <SkeletonPostList type={!props.cover && 'mini'} />}
      {!isLoading && (
        <ul>
          {items &&
            props.items.map((post, i) => {
              return (
                <PostPreview
                  cover={i === 0 ? props.cover : false}
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  image={post.image}
                  date={post.date}
                  author={props.author || post.author}
                  tags={post.tags}
                  slug={post.slug}
                  likes={post.likes}
                  unicorns={post.unicorns}
                  bookmarks={post.bookmarks}
                  comments={post.comments}
                />
              )
            })}
        </ul>
      )}
    </div>
  )
}

export default PostList
