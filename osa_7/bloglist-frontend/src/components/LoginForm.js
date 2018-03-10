import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

const LoginForm = ({ loginHandler }) => {
	return (
		<Segment>
			<form onSubmit={loginHandler} className='ui form'>
				<h3>Log in</h3>

				<div className='field'>
					<label>Username</label>
					<input 
						type="text"
						name="username"
					/>
				</div>

				<div className='field'>
					<label>Password</label>
					<input
						type="password"
						name="password"
					/>
				</div>
				<button className='positive ui button' type="submit">Log in</button>
			</form>
		</Segment>
	)
}

LoginForm.propTypes = {
	loginHandler: PropTypes.func.isRequired
}

export default LoginForm