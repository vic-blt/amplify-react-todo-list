import React, {useState} from "react";

export default function ({addTask}) {
    const [name, setName] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        if (name !== '') {
            addTask(name)
            setName('')
        } else {
            alert('You must specify the name of the task !')
        }
    }

    return (
        <form>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">What needs to be done?</label>
            </h2>
            <input type="text" id="new-todo-input" className="input input__lg" name="text" autoComplete="off"
                   value={name} onChange={({target: {value}}) => setName(value)} />
            <button type="submit" className="btn btn__primary btn__lg" onClick={handleSubmit}>Add</button>
        </form>
    )
}
