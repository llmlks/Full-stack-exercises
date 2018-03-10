import React from 'react'
import { Segment } from 'semantic-ui-react'

const Comments = ({ comments, commentHandler }) => (
	<Segment>
		<h4>Comments</h4>

		<ul>
			{comments.map(comment => (
				<li key={comment.id}>{comment.content}</li>
			))}
		</ul>

		<form onSubmit={commentHandler} className='ui form'>
			<input type='text' name='comment'/>
			<button className='neutral ui button' type='submit'>
				Add comment
			</button>
		</form>
	</Segment>
)

export default Comments