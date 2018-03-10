import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import NavMenu from './components/NavMenu'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import { notify } from './reducers/notificationReducer'
import { initialiseUsers } from './reducers/userReducer'
import { initialiseBlogs, deleteBlog, createBlog, likeBlog, commentBlog } from './reducers/blogReducer'
import { logIn, logOut, setLoggedInUser } from './reducers/currentUserReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

class App extends React.Component {

	async componentDidMount() {
		await this.props.initialiseUsers()
		await this.props.initialiseBlogs()
		await this.props.setLoggedInUser()
	}

	login = async (event) => {
		event.preventDefault()
		const target = event.target

		try {
			await this.props.logIn({
				username: target.username.value,
				password: target.password.value
			})

			target.username.value = ''
			target.password.value = ''

			this.props.notify('Login successful!', 'success')

		} catch (exception) {
			this.props.notify('Wrong username or password', 'error')
		}
	}

	logout = () => {
		this.props.logOut()
		this.props.notify('Logout successful!', 'success')
	}

	createBlog = async (event) => {
		event.preventDefault()

		const target = event.target
		const newBlog = {
			title: target.title.value,
			author: target.author.value,
			url: target.url.value
		}

		try {
			await this.props.createBlog(newBlog)

			target.title = ''
			target.author = ''
			target.url = ''

			this.props.notify(`A new blog ${newBlog.title} by ${newBlog.author} added!`, 'success')
		} catch (exception) {
			console.log(exception)
			this.props.notify('Creating a new blog failed.', 'error')
		}
	}

	likeABlog = (blogToLike) => {
		return async (event) => {
			event.preventDefault()

			try {
				await this.props.likeBlog(blogToLike)
			} catch (exception) {
				this.props.notify('Error occurred while updating blog', 'error')
			}
		}
	}

	deleteBlog = (blogToDelete) => {
		return async (event) => {
			event.preventDefault()

			if (window.confirm(`Are you sure you want to delete '${blogToDelete.title}' by ${blogToDelete.author}?`)) {
				try {
					await this.props.deleteBlog(blogToDelete.id)

					this.props.notify(`Blog '${blogToDelete.title}' by ${blogToDelete.author} deleted`, 'success')
				} catch (exception) {
					this.props.notify('Couldn\'t delete the blog.', 'error')
				}
			}
		}
	}

	commentBlog = (blog) => {
		return async (event) => {
			event.preventDefault()

			const target = event.target
			const comment = {
				content: target.comment.value
			}

			try {
				await this.props.commentBlog(blog.id, comment)

				target.comment.value = ''

				this.props.notify(`Comment ${comment.content} added to '${blog.title}'`, 'success')
			} catch (exception) {
				this.props.notify('Couldn\'t post the comment', 'error')
			}
		}
	}

	render() {
		const loginForm = () => {
			return (
				<LoginForm
					loginHandler={this.login}
				/>
			)
		}

		const loggedInView = () => {
			const isDeletable = (blog) => {
				return blog.user === null
					|| blog.user === undefined
					|| blog.user.username === this.props.user.username
			}

			return (
				<div>
					<Togglable buttonLabel="Create new blog">
						<CreateBlogForm
							createHandler={this.createBlog}
						/>
					</Togglable>

					<Route exact path='/' render={() => <BlogList />} />
					<Route exact path='/users' render={() => <UserList />} />
					<Route path='/users/:id' render={({ match }) => {
						const user = this.props.users.find(u => u.id === match.params.id)
						return <User user={user} />
					}}/>
					<Route path='/blogs/:id' render={({ match }) => {
						const blog = this.props.blogs.find(b => b.id === match.params.id)
						return (
							<Blog
								blog={blog}
								deleteHandler={isDeletable(blog) ? this.deleteBlog(blog) : null}
								likeHandler={this.likeABlog(blog)}
								commentHandler={this.commentBlog(blog)}
							/>
						)
					}}/>
				</div>
			)
		}

		return (
			<Container>
				<Router>
					<div>
						{this.props.user !== null
							&& <NavMenu username={this.props.user.username} logoutHandler={this.logout} />}

						<h2>Blogs</h2>

						<Notification />

						{this.props.user === null
							? loginForm()
							: loggedInView()
						}

					</div>
				</Router>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		user: state.currentUser,
		users: state.users
	}
}

const ConnectedApp = connect(
	mapStateToProps,
	{ notify, initialiseUsers, initialiseBlogs, deleteBlog, likeBlog,
		createBlog, logIn, logOut, setLoggedInUser, commentBlog }
)(App)

export default ConnectedApp