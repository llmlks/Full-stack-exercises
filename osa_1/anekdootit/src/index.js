import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, votes}) => {
    return (
        <div>
            <p>{text}</p>
            <p>Has {votes} votes</p>
        </div>
    )
}

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
        const mostVotes = () => {
            let most = 0;
            let index = 0;
            for (let i = 0; i < this.props.anecdotes.length; i++) {
                if (this.state.votes[i] > most) {
                    most = this.state.votes[i]
                    index = i
                }
            }
            return index;
        }

        return (
            <div>
                <Anecdote text={this.props.anecdotes[this.state.selected]} votes={this.state.votes[this.state.selected]} />
                <Button text='Vote' handleClick={this.vote} />
                <Button text='Next anecdote' handleClick={this.nextAnecdote} />
                <h2>Anecdote with most votes:</h2>
                <Anecdote text={this.props.anecdotes[mostVotes()]} votes={this.state.votes[mostVotes()]} />
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
