import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Function to handle user's login
  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //Function to handle user's logout
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  //Function to add new blog
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
        setMessage(null)
        }, 5000)
      })
  }

  //Function to increase likes
  const handleLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = await { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, likedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : likedBlog))
  }

  //Function to remove blog
  const handleRemove = (id) => {
    const blogToBeDeleted = blogs.find(blog => blog.id === id)
    if(window.confirm(`Remove blog ${blogToBeDeleted.title} by ${blogToBeDeleted.author}`)) {
      blogService
        .remove(id)
          .then(() => {
            setBlogs(blogs.filter(blog => blog.id !== id))
            setMessage(`Removed blog ${blogToBeDeleted.title} by ${blogToBeDeleted.author}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
    }
  }

  //Sort blogs into descending order
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <LoginForm handleLogin={handleLogin} />
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={message} errorMessage={errorMessage} />
        <div className='basicText'>{user.name} logged in<button onClick={handleLogout} className='logoutButton'>logout</button></div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateBlogForm createBlog={addBlog} />
        </Togglable>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user} />
        )}
    </div>
    )
  }

  return (
    <div className='blogApp'>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App