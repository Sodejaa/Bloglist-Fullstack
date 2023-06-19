import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

const blog = {
    title: 'title',
    author: 'author',
    user: {
        username: 'testuser'
    }
}

const user = {
    username: 'testuser'
}

test('renders content', () => {
    render(<Blog blog={blog} user={user} />)

    const element = screen.findByText('title author')
    expect(element).toBeDefined()
})

test('clicking like button twice calls event handler twice', async () => {
    const mockHandler = jest.fn()
    
    render(<Blog blog={blog} handleLike={mockHandler} user={user} />)

    const buttonUser = userEvent.setup()
    const button = screen.getByText('like')
    await buttonUser.click(button)
    await buttonUser.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<CreateBlogForm /> calls callback function with right parameters', async () => {
    const formUser = userEvent.setup()
    const createBlog = jest.fn()

    render(<CreateBlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const createButton = screen.getByText('create')

    await formUser.type(titleInput, 'new title')
    await formUser.type(authorInput, 'new author')
    await formUser.type(urlInput, 'new url')
    await formUser.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('new title')
    expect(createBlog.mock.calls[0][0].author).toBe('new author')
    expect(createBlog.mock.calls[0][0].url).toBe('new url')
})