import React, {useEffect, useState} from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import * as API from "./API";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function () {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('All')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadTasks()
        API.onCreateSubscription(setTasks)
        API.onDeleteSubscription(setTasks)
        API.onUpdateSubscription(setTasks)
    }, [])

    const loadTasks = async () => {
        const {data: {listTodos: {items: tasks}}} = await API.getTasks()
        setTasks(tasks)
        setIsLoading(false)
    }

    const taskActions = {removeTask: API.removeTask, updateTask: API.updateTask}

    const filterList = FILTER_NAMES
        .map(name =>
            <FilterButton key={name} name={name} setFilter={setFilter} isPressed={name === filter} />
        )

    const taskList = tasks
        .filter(task => FILTER_MAP[filter](task))
        .map(task =>
            <Todo {...task} key={task.id} {...taskActions} />
        )

    const loader = <p>Loading...</p>

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={API.addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">{taskList.length} task(s) remaining</h2>
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {isLoading ? loader : taskList}
            </ul>
        </div>
    )
}
