import React from 'react'

const Input = ({ inputObject }) => {
    return (
        <div>
            {inputObject.name}: <input value={inputObject.value} onChange={inputObject.onChange} />
        </div>
    )
}

const NewContactForm = ({ submitHandler, filterObject, inputObjects }) => {
    return (
        <div>
            <Input key={filterObject.name} inputObject={filterObject} />

			<h3>Lisää uusi</h3>

            <form onSubmit={submitHandler}>
                {inputObjects.map(input => <Input key={input.name} inputObject={input} />)}

                <button type='submit'>
                    Lisää
                </button>
            </form>
        </div>
    )
}

export default NewContactForm