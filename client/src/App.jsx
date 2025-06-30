import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Add_blog from './pages/admin/Add_blog'
import Comments from './pages/admin/Comments'
import List_blog from './pages/admin/List_blog'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'


const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/blog/:id' element = {<Blog/>} />
      <Route path='/admin' element={true ?<Layout/> : <Login/>}>
        <Route index element = {<Dashboard/>}/>
        < Route path='addBlog' element={<Add_blog/>}/>
        <Route path='list_blog' element={<List_blog/>}/>
        <Route path='comments' element={<Comments/>}/>
      </Route>
      </Routes>
    </div>
  )
}

export default App