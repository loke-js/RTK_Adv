import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import React from 'react';
import { Link } from 'react-router-dom';

const PostExcerpt = ({ post }) => {
    return (
        <article key={post.id}>
            <h2>{post.title}</h2>
            <p className='excerpt'>{post.body.substring(0, 75)}...</p>
            <div className="postCredit">
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
                <ReactionButtons post={post} />
            </div>
        </article>
    )
}

export default PostExcerpt
