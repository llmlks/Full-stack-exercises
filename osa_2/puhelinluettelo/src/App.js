import React from 'react';
import Persons from './components/Persons'
import NewContactForm from './components/NewContactForm'
import contactService from './services/contacts'
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {
  	constructor(props) {
    	super(props)
    	this.state = {
      		persons: [],
			newName: '',
			newNumber: '',
			filter: '',
			message: null
    	}
  	}

	componentWillMount() {
		contactService
			.getAll()
			.then(persons => {
				this.setState({ persons })
			})
	}

	addNewPerson = (event) => {
		event.preventDefault()

		const newContact = {
			name: this.state.newName,
			number: this.state.newNumber
		}

		const existing = this.state.persons.filter(person =>
			 person.name === newContact.name
		)
		if (existing.length > 0) {
			const confirmed = window.confirm(
				`${newContact.name} on jo luettelossa, korvataanko vanha numero uudella?`
			)
			if (confirmed) {
				this.handleUpdateContact(newContact, existing[0].id)
			} 
		} else {
			this.handleAddContact(newContact)
		}
	}

	handleAddContact = (newContact) => {
		contactService
		.create(newContact)
		.then(newPerson => {
			const persons = this.state.persons.concat(newPerson)

			this.setState({ 
				persons,
				newName: '',
				newNumber: '',
				message: `Lisättiin ${newPerson.name}`
			})

			setTimeout(() => {
				this.setState({ message: null })
			}, 3000)
		})
	}

	handleUpdateContact = (newContact, id) => {
		contactService
			.update(id, newContact)
			.then(newPerson => {
				const persons = this.state.persons.map(n =>
					n.id === newPerson.id ? newPerson : n
				)

				this.setState({
					persons,
					newName: '',
					newNumber: '',
					message: `Päivitettiin henkilön ${newPerson.name} puhelinnumero`
				})

				setTimeout(() => {
					this.setState({ message: null })
				}, 3000)
			})
			.catch(() => {
				this.handleAddContact(newContact)
			})
	}
	handleNameChange = (event) => {
		const newName = event.target.value
		this.setState({ newName })
	}

	handleNumberChange = (event) => {
		const newNumber = event.target.value
		this.setState({ newNumber })
	}

	handleFilterChange = (event) => {
		const filter = event.target.value
		this.setState({ filter })
	}

	removeHandler = (id) => {
		return () => {
			contactService
				.remove(id)
				.then(() => {
					this.setState({
						persons: this.state.persons.filter(person => person.id !== id),
						message: `Poisto onnistui`
					})

					setTimeout(() => {
						this.setState({ message: null })
					}, 3000)
				})
		}
	}

	render() {
		const inputObjects = [
			{
				name: 'nimi',
				value: this.state.newName,
				onChange: this.handleNameChange
			},
			{
				name: 'numero',
				value: this.state.newNumber,
				onChange: this.handleNumberChange
			}
		]

		const filterObject = {
			name: 'Rajaa näytettäviä',
			value: this.state.filter,
			onChange: this.handleFilterChange
		}

		return (
      		<div>
        		<h2>Puhelinluettelo</h2>
				<Notification message={this.state.message} />
				<NewContactForm submitHandler={this.addNewPerson} filterObject={filterObject} inputObjects={inputObjects} />
        		<Persons persons={this.state.persons} filter={this.state.filter} removeHandler={this.removeHandler}/>
      		</div>
    	)
  	}
}

export default App