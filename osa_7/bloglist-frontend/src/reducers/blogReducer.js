import blogService from '../services/blogs'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_BLOG':
			return state.concat(action.blog)
		case 'LIKE':
			return state.map(blog => blog.id === action.blog.id ? action.blog : blog)
		case 'DELETE':
			return state.filter(blog => blog.id !== action.id)
		case 'INITIALISE_BLOGS':
			return action.data.sort((a, b) => b.likes - a.likes)
		case 'COMMENT':
			return state.map(blog =>
				blog.id === action.blogId
					? { ...blog, comments: blog.comments.concat(action.comment)}
					: blog
				)
		default:
			return state
	}
}

export const createBlog = (blog) => {
	return async (dispatch) => {
		const response = await blogService.create(blog)
		dispatch({
			type: 'NEW_BLOG',
			blog: response
		})
	}
}

export const likeBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		await blogService.update(updatedBlog)
		dispatch({
			type: 'LIKE',
			blog: updatedBlog
		})
	}
}

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.deleteBlog(id)
		dispatch({
			type: 'DELETE',
			id
		})
	}
}

export const initialiseBlogs = () => {
	return async (dispatch) => {
		const response = await blogService.getAll()
		dispatch({
			type: 'INITIALISE_BLOGS',
			data: response
		})
	}
}

export const commentBlog = (blogId, comment) => {
	return async (dispatch) => {
		const response = await blogService.comment(blogId, comment)
		dispatch({
			type: 'COMMENT',
			comment: response,
			blogId
		})
	}
}

export default reducer