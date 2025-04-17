

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { selectPostById, updatePost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const EditPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    console.log(postId);

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    console.log(post);
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');

    if (!post) {
        return (
            <section>
                <h2>Post not Found</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';
    
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending');
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${postId}`);
            } catch (error) {
                console.error('Failed to save post', error.message);
            } finally {
                setRequestStatus('idle');
            }
        }
    }

    return (
        <section>
        <h2>Update Post</h2>
        <form action="">
            <label htmlFor="postTitle">Post Title:</label>
            <input
                type="text"
                id='postTitle'
                name='postTitle'
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor="postAuthor">Author:</label>
            <select name="" id="postAuthor" defaultValue={userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {usersOptions}
            </select>
            <label htmlFor="postContent">Content:</label>
            <textarea name="postContent" id="postContent" value={content} onChange={onContentChanged}></textarea>
            <button type='button' onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
        </form>
    </section>
    )
}

export default EditPostForm
