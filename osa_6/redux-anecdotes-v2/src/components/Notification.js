import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => {
	if (message.length === 0) {
		return null
	}

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
	return (
		<div style={style}>
			{message}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		message: state.notification
	}
}

export default connect(mapStateToProps)(Notification)