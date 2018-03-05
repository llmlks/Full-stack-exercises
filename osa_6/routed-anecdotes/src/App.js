import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Form, Button, Segment, Image } from 'semantic-ui-react'

const Menu = () => {
	const style = {
		padding: 10,
		fontWeight: 'bold',
		color: '#006680'
	}

	const activeStyle = {
		padding: 10,
		backgroundColor: '#006680',
		fontWeight: 'bold',
		color: '#86e2f9'
	}

	const menuBarStyle = {
		padding: 10,
		backgroundColor: '#86e2f9',
		marginTop: 10,
		marginBottom: 10
	}

	return (
		<Segment style={menuBarStyle}>
			<NavLink activeStyle={activeStyle} style={style} exact to='/'>Anecdotes</NavLink>
			<NavLink activeStyle={activeStyle} style={style} exact to='/create'>Create new</NavLink>
			<NavLink activeStyle={activeStyle} style={style} exact to='/about'>About</NavLink>
		</Segment>
	)
}

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<Table basic='very' striped celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>
						Anecdote
					</Table.HeaderCell>
					<Table.HeaderCell>
						Votes
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{anecdotes.map(anecdote =>
					<Table.Row key={anecdote.id} >
						<Table.Cell>
							<Link to={`/anecdotes/${anecdote.id}`}>
								{anecdote.content}
							</Link>
						</Table.Cell>
						<Table.Cell>
							{anecdote.votes}
						</Table.Cell>
					</Table.Row>)}
			</Table.Body>
		</Table>
	</div>
)

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<Grid celled='internally'>
			<Grid.Row>
				<Grid.Column width={10}>
					<p>According to Wikipedia:</p>

					<Segment color='teal'><em>An anecdote is a brief, revealing account of an individual person or an incident. 
					Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
					such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
					An anecdote is "a story with a point."</em></Segment>

					<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
				</Grid.Column>
				<Grid.Column width={6}>
					<Image rounded src='https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg' alt='Ada Lovelace'/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</div>
)

const Anecdote = ({ anecdote }) => (
	<div>
		<h2>{anecdote.content} by {anecdote.author}</h2>
		<p>Has {anecdote.votes} votes</p>
		<p>For more info, see <a href={anecdote.info}>{anecdote.info}</a></p>
	</div>
)

const Footer = () => (
	<div>
		Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

		See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
	</div>
)

const Notification = ({ message }) => {
	if (message.length === 0) return null

	const style = {
		padding: 5,
		margin: 2,
		borderColor: 'green',
		border: 2,
		borderLeft: 10,
		borderStyle: 'solid',
		color: '#28582f',
		backgroundColor: '#00ff72'
	}

	return (
		<div style={style}>
			{message}
		</div>
	)
}

class CreateNew extends React.Component {
	constructor() {
		super()
		this.state = {
			content: '',
			author: '',
			info: ''
		}
	}

	handleChange = (e) => {
		console.log(e.target.name, e.target.value)
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.addNew({
			content: this.state.content,
			author: this.state.author,
			info: this.state.info,
			votes: 0
		})
		this.props.history.push('/')
	}

	render() {
		return(
			<div>
				<h2>Create a new anecdote</h2>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field>
						<label>Content</label>
						<input name='content' value={this.state.content} onChange={this.handleChange} />
					</Form.Field>
					<Form.Field>
						<label>Author</label>
						<input name='author' value={this.state.author} onChange={this.handleChange} />
					</Form.Field>
					<Form.Field>
						<label>URL for more info</label>
						<input name='info' value={this.state.info} onChange={this.handleChange} />
					</Form.Field>
					<Button type='submit' color='green'>create</Button>
				</Form>
			</div>
		)
	}
}

class App extends React.Component {
	constructor() {
		super()

		this.state = {
			anecdotes: [
				{
					content: 'If it hurts, do it more often',
					author: 'Jez Humble',
					info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
					votes: 0,
					id: '1'
				},
				{
					content: 'Premature optimization is the root of all evil',
					author: 'Donald Knuth',
					info: 'http://wiki.c2.com/?PrematureOptimization',
					votes: 0,
					id: '2'
				}
			],
			message: ''
		}
	}

	addNew = (anecdote) => {
		const message = `A new anecdote '${anecdote.content}' created!`
		anecdote.id = (Math.random() * 10000).toFixed(0)
		this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), message })
		setTimeout(() => {
			this.setState({ message: '' })
		}, 10000)

	}

	anecdoteById = (id) =>
		this.state.anecdotes.find(a => a.id === id)

	vote = (id) => {
		const anecdote = this.anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

		this.setState({ anecdotes })
	}

	render() {
		return (
			<Container>
					<Router>
						<div>
							<h1>Software anecdotes</h1>
							<Menu />
							<Notification message={this.state.message} />

							<Route exact path='/' render={() =>
								<AnecdoteList anecdotes={this.state.anecdotes} />
							} />
							<Route path='/about' render={() => <About />} />
							<Route path='/create' render={({ history }) =>
								<CreateNew addNew={this.addNew} history={history} />
							} />
							<Route path='/anecdotes/:id' render={({ match }) =>
								<Anecdote anecdote={this.anecdoteById(match.params.id)}/>
							} />
						</div>
					</Router>
				<Footer />
			</Container>
		)
	}
}

export default App;
