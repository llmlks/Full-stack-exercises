import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
	switch (action.type) {
	case 'VOTE':
		return store.map(a =>
			a.id === action.data.id ? action.data : a
		)
	case 'CREATE':
		return [...store, action.data]
	case 'INITIALISE':
		return action.data
	default:
		return store
	}
}

export const voting = (data) => {
	return async (dispatch) => {
		const response = await anecdoteService.update({
			...data,
			votes: data.votes + 1
		})
		dispatch({
			type: 'VOTE',
			data: response
		})
	}
}

export const creation = (content) => {
	return async (dispatch) => {
		const response = await anecdoteService.create(content)
		dispatch({
			type: 'CREATE',
			data: response
		})
	}
}

export const initialisation = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INITIALISE',
			data: anecdotes
		})
	}
}

export default reducer