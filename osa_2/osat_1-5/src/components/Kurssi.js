import React from 'react'

const Otsikko = ({ title }) => {
    return (
        <h1>{title}</h1>
    )
}

const Osa = ({ osa }) => {
    return (
        <p>{osa.nimi} {osa.tehtavia}</p>
    )
}

const Sisalto = ({ osat }) => {
    return (
        <div>
            {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
    )
}

const Yhteensa = ({ osat }) => {
    let total = osat
        .map(osa => osa.tehtavia)
        .reduce(((tehtavia, current) => tehtavia + current), 0);

    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko title={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )    
}

export default Kurssi