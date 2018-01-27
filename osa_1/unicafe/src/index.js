import React from 'react';
import ReactDOM from 'react-dom';

const Title = ({title}) => <h1>{title}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, total}) => <p>{text} {total}</p>

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
        return (
            <div>
                <Title title='Anna palautetta' />

                <div>
                    <Button text='Hyvä' handleClick={this.clickGood} />
                    <Button text='Neutraali' handleClick={this.clickNeutral} />
                    <Button text='Huono' handleClick={this.clickBad} />
                </div>

                <Title title='Statistiikka' />

                <p>Hyvä {this.state.good}</p>
                <p>Neutraali {this.state.neutral}</p>
                <p>Huono {this.state.bad}</p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));