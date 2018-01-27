import React from 'react';
import ReactDOM from 'react-dom';

const Title = ({title}) => <h1>{title}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Buttons = ({buttons}) => {
    const elements =[]

    buttons.forEach(element => {
        elements.push(<Button text={element.text} handleClick={element.handleClick} />)
    });

    return (
        <div>
            {elements}
        </div>
    )
}

const Statistic = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({values}) => {
    const {good, bad, neutral, total} = values

    if (total === 0) {
        return (
            <div>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }

    const average = () => {
        let summa = good - bad
        return Math.round(summa / total * 10) / 10
    }

    const positives = () => {
        return Math.round(good / total * 1000) / 10 + '%'
    }

    return (
        <div>
            <Statistic text='Hyvä' value={good} />
            <Statistic text='Neutraali' value={neutral} />
            <Statistic text='Huono' value={bad} />
            <Statistic text='Keskiarvo' value={average()} />
            <Statistic text='Positiivisia' value={positives()} />
        </div>
    )    
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
            total: 0
        }
    }

    handleClick = (option) => () => {
        const state = this.state
        state[option] = state[option] + 1
        state.total = state.total + 1
        this.setState(state)
    }

    render() {

        const buttons = [
            {
                text: 'Hyvä',
                handleClick: this.handleClick('good')
            },
            {
                text: 'Neutraali',
                handleClick: this.handleClick('neutral')
            },
            {
                text: 'Huono',
                handleClick: this.handleClick('bad')
            }
        ]

        return (
            <div>
                <Title title='Anna palautetta' />
                <Buttons buttons={buttons} />
                <Title title='Statistiikka' />
                <Statistics values={this.state} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));