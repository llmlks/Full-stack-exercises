import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)

        const votes = []
        props.anecdotes.forEach(element => {
            votes.push(0)
        });

        this.state = {
            selected: 0,
            votes: votes
        }
    }

    nextAnecdote = () => {
        this.setState({
            selected: Math.floor(Math.random() * this.props.anecdotes.length)
        })
    }

    vote = () => {
        const votes = this.state.votes
        votes[this.state.selected]++
        this.setState({
            votes: votes
        })
    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>Has {this.state.votes[this.state.selected]} votes</p>
                <Button text='Vote' handleClick={this.vote} />
                <Button text='Next anecdote' handleClick={this.nextAnecdote} />
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
