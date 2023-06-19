import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => (
  <div className='blog'>
    <div className='titleAndAuthor'>
      {blog.title} written by {blog.author}
    </div>
    <div className='url'>
      {blog.url}
    </div>
    <div className='likes'>
      Likes {blog.likes}
      <button onClick={() => handleLike(blog.id)} className='likeButton'>like</button>
    </div>
    <div>
      {user.username === blog.user.username ?
        <button onClick={() => handleRemove(blog.id)} className='removeButton'>remove</button> :
        null
      }
    </div>
  </div>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func,
  user: PropTypes.object.isRequired
}

export default Blog