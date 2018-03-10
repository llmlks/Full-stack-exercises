const reducer = (state = null, action) => {
	switch (action.type) {
		case 'NOTIFY':
			return action.notification
		default:
			return state
	}
}

export const notify = (message, style) => {
	return async (dispatch) => {
		dispatch({
			type: 'NOTIFY',
			notification: {
				message,
				style
			}
		})
		setTimeout(() => {
			dispatch({
				type: 'NOTIFY',
				notification: null
			})
		}, 3000)
	}
}

export default reducer