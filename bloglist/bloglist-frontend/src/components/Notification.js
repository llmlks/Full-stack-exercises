import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
	if (notification === null) {
		return null
	}

	const color = notification.style === 'error'
		? 'red'
		: 'green'
	return (
		<Message color={color}>
			{notification.message}
		</Message>
	)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const ConnectedNotification = connect(
	mapStateToProps
)(Notification)

export default ConnectedNotification