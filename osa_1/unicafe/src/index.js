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

    const average = () => {
        if (total === 0) {
            return 0;
        }
        let summa = good - bad
        return Math.round(summa / total * 10) / 10
    }

    const positives = () => {
        if (total === 0) {
            return '0%'
        }
        return Math.round(good / total * 1000) / 10 + '%'
    }
    return (
        <div>
            <Title title='Statistiikka' />

            <div>
                <Statistic text='Hyvä' value={good} />
                <Statistic text='Neutraali' value={neutral} />
                <Statistic text='Huono' value={bad} />
                <Statistic text='Keskiarvo' value={average()} />
                <Statistic text='Positiivisia' value={positives()} />
            </div>

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

    clickGood = () => {
        this.setState({
            good: this.state.good + 1,
            total: this.state.total + 1
        })
    }

    clickNeutral = () => {
        this.setState({
            neutral: this.state.neutral + 1,
            total: this.state.total + 1
        })
    }

    clickBad = () => {
        this.setState({
            bad: this.state.bad + 1,
            total: this.state.total + 1
        })
    }

    render() {

        const buttons = [
            {
                text: 'Hyvä',
                handleClick: this.clickGood
            },
            {
                text: 'Neutraali',
                handleClick: this.clickNeutral
            },
            {
                text: 'Huono',
                handleClick: this.clickBad
            }
        ]

        const values = {
            good: this.state.good,
            neutral: this.state.neutral,
            bad: this.state.bad,
            total: this.state.total
        }

        return (
            <div>
                <Title title='Anna palautetta' />
                <Buttons buttons={buttons} />
                <Statistics values={values} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));