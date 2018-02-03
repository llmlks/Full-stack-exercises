import React from 'react'

const Person = ({ person, removeHandler }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={removeHandler}>Poista</button></td>
        </tr>
    )
}

const Persons = ({ persons, filter, removeHandler }) => {
    const personsToShow = filter.length === 0 ?
        persons :
        persons.filter(person => person.name.match(new RegExp(filter, "i")))

    return (
        <div>
        	<h3>Numerot</h3>

            <table>
                <tbody>
                    {personsToShow.map(person => <Person key={person.id} person={person} removeHandler={removeHandler(person.id)} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Persons