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
    const elems = [];

    props.osat.forEach(osa => {
        elems.push(<Osa osa={osa.nimi} teht={osa.tehtavia} />)
    })

    return (
        <div>
            {elems}
        </div>
    )
}

const Yhteensa = (props) => {
    let total = 0;

    props.osat.forEach(element => {
        total += element.tehtavia
    });

    return (
        <p>yhteensä {total} tehtävää</p>        
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
        <div>
            <Otsikko title={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
