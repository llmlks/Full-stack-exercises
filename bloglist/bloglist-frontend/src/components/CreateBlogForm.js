import React from 'react'
import { Segment } from 'semantic-ui-react'

const CreateBlogForm = ({ createHandler }) => {

	return (
		<Segment>
			<form className='ui form' onSubmit={createHandler}>
				<h4>Create new blog</h4>

				<div className='field'>
					<label>Title</label>
					<input
						type="text"
						name="title"
					/>
				</div>

				<div className='field'>
					<label>Author</label>
					<input
						type="text"
						name="author"
					/>
				</div>

				<div className='field'>
					<label>URL</label>
					<input
						type="text"
						name="url"
					/>
				</div>

				<button className='positive ui button' type="submit">
					Create
				</button>
			</form>
		</Segment>
	)
}

export default CreateBlogForm