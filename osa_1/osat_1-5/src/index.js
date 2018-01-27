import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.title}</h1>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa} {props.teht}</p>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.osa1} teht={props.teht1} />
            <Osa osa={props.osa2} teht={props.teht2} />
            <Osa osa={props.osa3} teht={props.teht3} />
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.teht1 + props.teht2 + props.teht3} tehtävää</p>        
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    return (
        <div>
            <Otsikko title={kurssi} />
            <Sisalto 
                osa1={osa1.nimi} teht1={osa1.tehtavia}
                osa2={osa2.nimi} teht2={osa2.tehtavia}
                osa3={osa3.nimi} teht3={osa3.tehtavia} 
            />
            <Yhteensa teht1={osa1.tehtavia} teht2={osa2.tehtavia} teht3={osa3.tehtavia} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
