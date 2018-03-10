import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
	switch (action.type) {
		case 'LOG_IN':
			return action.user
		case 'LOG_OUT':
			return null
		default:
			return state
	}
}

export const logIn = (credentials) => {
	return async (dispatch) => {
		const response = await loginService.login(credentials)
		blogService.setToken(response.token)
		window.localStorage.setItem('loggedInUser', JSON.stringify(response))
		dispatch({
			type: 'LOG_IN',
			user: response
		})
	}
}

export const logOut = () => {
	blogService.setToken('')
	window.localStorage.removeItem('loggedInUser')
	return {
		type: 'LOG_OUT'
	}
}

export const setLoggedInUser = () => {
	let user = window.localStorage.getItem('loggedInUser')
	if (user) {
		user = JSON.parse(user)
		blogService.setToken(user.token)
	}
	return {
		type: 'LOG_IN',
		user
	}
}

export default reducer