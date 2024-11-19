import { useEffect, useState } from "react";
import "./style.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
    const [todos, setTodos] = useState(() => {
        const localVal = localStorage.getItem("todos")
        if (localVal === null) return []

        return JSON.parse(localVal)
    })

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos)) // store the todos to local storage
    }, [todos]) // this runs every time todos changes

    function addTodo(title) {
        setTodos((currentTodos) => {
            return [...currentTodos, { id:crypto.randomUUID(), title: title, completed: false }]
        })
    }
    function toggleTodo(id, completed) {
        setTodos((currentTodos) => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed }
                }
                return todo
            })
        })
    }

    function deleteTodo(id) {
        setTodos((currentTodos) => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }

   return (
        <>
            <NewTodoForm onSubmit={addTodo}/>
            <h1 className="header">Todo list</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </>
   )
}