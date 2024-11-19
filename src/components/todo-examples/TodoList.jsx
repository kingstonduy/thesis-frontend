import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">
            {todos.length === 0 && <li>No todos</li>}
            {todos.map(todo => {
                return (
                   <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
                // use  {...todo}  instead of passing each prop separately
                //    id={todo.id}
                //    completed={todo.completed}
                //    title={todo.title}
                //    key={todo.id}/>
                )
            })}
        </ul>
    )
}