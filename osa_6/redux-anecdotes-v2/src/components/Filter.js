import React from 'react'
import { changeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {

	handleChange = (event) => {
		const filter = event.target.value
		this.props.changeFilter(filter)
	}

	render() {
		const style = {
			marginBottom: 10
		}

		return (
			<div style={style}>
				Filter: <input onChange={this.handleChange}/>
			</div>
		)
	}
}

const ConnectedFilter = connect(null, { changeFilter })(Filter)
export default ConnectedFilter