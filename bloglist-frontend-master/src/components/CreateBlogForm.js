import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div className='basicText'>
          title:
            <input
            type='text'
            value={newTitle}
            name='Title'
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder='title'
            className='inputBox'
          />
        </div>
        <div className='basicText'>
          author:
            <input
            type='text'
            value={newAuthor}
            name='Author'
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder='author'
            className='inputBox'
          />
        </div>
        <div className='basicText'>
          url:
            <input
            type='text'
            value={newUrl}
            name='Url'
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder='url'
            className='inputBox'
          />
        </div>
      <div>
        <button type="submit" className='createButton'>create</button>
      </div>  
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlogForm