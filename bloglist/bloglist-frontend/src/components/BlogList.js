import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Table } from 'semantic-ui-react'

const BlogList = ({ blogs }) => (
	<Segment>
		<h3>Blogs</h3>
		<Table striped>
			<Table.Body>
				{blogs.map(blog => (
					<Table.Row>
						<Table.Cell key={blog.id}>
							<Link to={`/blogs/${blog.id}`}>
								{blog.title} by {blog.author}
							</Link>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	</Segment>
)

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

const ConnectedBlogList = connect(
	mapStateToProps
)(BlogList)

export default ConnectedBlogList