import React from 'react'
import PropTypes from 'prop-types'
import Comments from './Comments'
import { Segment, Statistic } from 'semantic-ui-react'

const Blog = ({ blog, deleteHandler, likeHandler, commentHandler }) => {
	const deleteButton = () => {
		return (
			<button className="negative ui button" onClick={deleteHandler}>Delete</button>
		)
	}

	return (
		<Segment>
			<h3>
				{blog.title} {blog.author}
			</h3>
			<div className="blogDetails">
				<a href={blog.url}>{blog.url}</a>

				<div>
					<Statistic>
						<Statistic.Value>{blog.likes}</Statistic.Value>
						<Statistic.Label>Likes</Statistic.Label>
					</Statistic>
					<button inverted color='violet' className='small ui button' onClick={likeHandler}>
						Like
					</button>
				</div>

				<p>
					Added by {blog.user.name}
				</p>

				{deleteHandler !== null
					&& deleteHandler !== undefined
					&& deleteButton()}
			</div>

			<Comments comments={blog.comments} commentHandler={commentHandler} />
		</Segment>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	likeHandler: PropTypes.func.isRequired
}

export default Blog