const reducer = (state = '', action) => {
	switch (action.type) {
	case 'MESSAGE':
		return action.message
	default:
		return state
	}
}

export const notify = (message, timeout) => {
	return async (dispatch) => {
		dispatch({
			type: 'MESSAGE',
			message: message
		})
		setTimeout(() => {
			dispatch({
				type: 'MESSAGE',
				message: ''
			})
		}, timeout*1000)
	}
}

export default reducer