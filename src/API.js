import { API, graphqlOperation } from 'aws-amplify';
import {nanoid} from "nanoid";
import {createTodo, deleteTodo, updateTodo} from "./graphql/mutations";
import {onCreateTodo, onDeleteTodo, onUpdateTodo} from "./graphql/subscriptions";
import {listTodos} from "./graphql/queries";

export const getTasks = () => API.graphql(graphqlOperation(listTodos))

export const addTask = name => API.graphql(graphqlOperation(createTodo, {input: newTask(name)}))

export const removeTask = id => API.graphql(graphqlOperation(deleteTodo, {input: {id}}))

export const updateTask = task => API.graphql(graphqlOperation(updateTodo, {input: task}))

export const onCreateSubscription = setTasks => API.graphql(graphqlOperation(onCreateTodo)).subscribe({
    next: ({value: {data: {onCreateTodo: task}}}) => setTasks(prevState => [...prevState, task]),
    error: err => console.error(err),
})

export const onDeleteSubscription = setTasks => API.graphql(graphqlOperation(onDeleteTodo)).subscribe({
    next: ({value: {data: {onDeleteTodo: {id}}}}) => setTasks(prevState => prevState.filter(task => task.id !== id)),
    error: err => console.error(err),
})

export const onUpdateSubscription = setTasks => API.graphql(graphqlOperation(onUpdateTodo)).subscribe({
    next: ({value: {data: {onUpdateTodo: updatedTask}}}) => setTasks(prevState => [...prevState].map(task => task.id === updatedTask.id ? {...task, ...updatedTask} : task)),
    error: err => console.error(err),
})

const newTask = name => ({name, completed: false, id: `todo-${nanoid()}`})