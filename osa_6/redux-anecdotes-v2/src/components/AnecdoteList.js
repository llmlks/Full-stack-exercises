import React from 'react'
import Filter from './Filter'
import { voting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

	vote = (anecdote) => async () => {
		this.props.voting(anecdote)

		this.props.notify(`You voted for '${anecdote.content}'`, 5)
	}

	render() {
		return (
			<div>
				<h2>Anecdotes</h2>
				<Filter />
				{this.props.anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={this.vote(anecdote)}>
								vote
							</button>
						</div>
					</div>
				)}
			</div>
		)
	}
}

const anecdotesToShow = (anecdotes, filter) => {
	const filtered = anecdotes.filter(a =>
		a.content.toLowerCase().includes(filter)
	)

	return filtered.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
	return {
		anecdotes: anecdotesToShow(state.anecdotes,
			state.filter.toLowerCase())
	}
}

const ConnectedAnecdoteList = connect(
	mapStateToProps,
	{ voting, notify }
)(AnecdoteList)

export default ConnectedAnecdoteList
