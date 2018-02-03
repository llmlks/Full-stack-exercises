import React, { Component } from 'react';
import axios from 'axios'

const Country = ({ country }) => {
	return (
		<div>
			<h2>{country.name} {country.nativeName}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<img src={country.flag} width='50%' height='50%' alt='Flag of the country'/>
		</div>
	)
}

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			countries: [],
			filter: ''
		}
	}

	componentWillMount() {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				this.setState({ countries: response.data })
			})
	}

	handleFilterChange = (event) => {
		this.setState({ filter: event.target.value })
	}

	chooseCountry = (event) => {
		this.setState({ filter: event.target.id })
	}

	getCountriesToShow = () => {
		const toShow = this.state.filter.length === 0 ?
				this.state.countries :
				this.state.countries
					.filter(country => 
						country.name.match(
							new RegExp(this.state.filter, "i")))
		let result = 0
		if (toShow.length === 1) {
			result = <Country country={toShow[0]} />
		} else if (toShow.length <= 10) {
			result = toShow.map(country =>
				<p id={country.name} onClick={this.chooseCountry}>{country.name}</p>
			)
		} else {
			result = <p>Too many matches, specify another filter</p>
		}
		return result
	}

	render() {
		
		return (
      		<div>
				Find countries: <input value={this.state.filter} onChange={this.handleFilterChange}/>
				{this.getCountriesToShow()}
	      	</div>
    	);
  	}
}

export default App;
