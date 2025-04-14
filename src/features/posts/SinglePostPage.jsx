

import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts, selectPostById } from './postsSlice'
import { useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
const SinglePostPage = () => {
    const {postId} = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
                <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage
