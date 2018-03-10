import React from 'react'
import { Segment } from 'semantic-ui-react'

const User = ({ user }) => {
	return (
		<Segment>
			<h2>{user.name}</h2>

			<h3>Added blogs</h3>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title} by {blog.author}</li>
				))}
			</ul>
		</Segment>
	)
}

export default User