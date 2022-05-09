import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PreviewReactions from '../PostPreview/PreviewReactions';
import Avatar from '../Avatar/Avatar';
import { PostTags } from '../PostTags/PostTags';
import { AuthorInfo } from '../AuthorInfo/AuthorInfo';
import { PostImage } from '../PostImage/PostImage';
import { formatDate } from '../../utils';
import useAuth from '../../hooks/useAuth';

const PostPreview = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { userId, currentUser } = useAuth();

  const { title, id, image, author, date, titleURL, tags, cover } = props;
  const createdAt = formatDate(date);

  return;
  id ? (
    <div className="preview flow-content">
      {cover && (
        <PostImage link={`/posts/${titleURL}/${id}`} src={image} alt={`Cover image for ${title}`} />
      )}
      <div className="preview__author">
        <Avatar link={`/users/${author.id}`} src={author.avatar} />
        <AuthorInfo status="preview" author={author} date={createdAt} />
      </div>
      <div className="preview__details flow-content">
        <Link to={`/posts/${titleURL}/${id}`} className="title-link">
          <h2>{title}</h2>
        </Link>
        <PostTags tags={tags} />
        <PreviewReactions
          userId={userId}
          post={props}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PostPreview;
