import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>} >
        <Route index element={<PostsList/>}/>
        <Route path="post"> 
          <Route index element={<AddPostForm/>} />
          <Route path=":postId" element={<SinglePostPage/>} />
          <Route  path="edit/:postId" element={<EditPostForm/>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
