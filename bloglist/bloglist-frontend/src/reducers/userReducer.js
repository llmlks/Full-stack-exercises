import userService from '../services/users'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INITIALISE_USERS':
			return action.data
		default:
			return state
	}
}

export const initialiseUsers = () => {
	return async (dispatch) => {
		const response = await userService.getAll()
		dispatch({
			type: 'INITIALISE_USERS',
			data: response
		})
	}
}

export default reducer