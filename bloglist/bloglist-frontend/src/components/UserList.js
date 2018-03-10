import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Table } from 'semantic-ui-react'

const UserList = ({ users }) => {
	return (
		<Segment>
			<h3>Users</h3>
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Blogs added</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{users.map(user => (
						<Table.Row key={user.id}>
							<Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
							<Table.Cell>{user.blogs.length}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Segment>
	)
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const ConnectedUserList = connect(
	mapStateToProps
)(UserList)

export default ConnectedUserList