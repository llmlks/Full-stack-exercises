import React from 'react'
import { creation } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
	handleSubmit = async (e) => {
		e.preventDefault()

		const content = e.target.anecdote.value
		e.target.anecdote.value = ''

		this.props.creation(content)

		this.props.notify(`New anecdote '${content}' added`, 5)
	}

	render() {
		return (
			<div>
				<h2>create new</h2>
				<form onSubmit={this.handleSubmit}>
					<div><input name='anecdote'/></div>
					<button>create</button>
				</form>
			</div>
		)
	}
}

const ConnectedAnecdoteForm = connect(
	null,
	{ creation, notify }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
