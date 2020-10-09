import React, {useState} from "react";

export default function ({id, name, completed, removeTask, updateTask}) {
    const [isEditing, setEditing] = useState(false)
    const [newName, setNewName] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        if (newName !== '') {
            setEditing(false)
            updateTask({id, name: newName})
            setNewName('')
        } else {
            alert('You must specify the name of the task !')
        }
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={id}>New name for {name}</label>
                <input id={id} className="todo-text" type="text" value={newName}
                       onChange={({target: {value}}) => setNewName(value)} />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>Cancel</button>
                <button type="submit" className="btn btn__primary todo-edit">Save</button>
            </div>
        </form>
    )

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input id={id} type="checkbox" checked={completed}
                       onChange={({target:  {checked: completed}}) => updateTask({id, completed})} />
                <label className="todo-label" htmlFor={id}>{name}</label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setEditing(true)}>Edit</button>
                <button type="button" className="btn btn__danger" onClick={() => removeTask(id)}>Delete</button>
            </div>
        </div>
    )

    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
}
