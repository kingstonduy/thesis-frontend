import { useState } from "react"


export function NewTodoForm({ onSubmit}) {
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        e.preventDefault() // prevent the page from refreshing

        // problem: t muốn add 2 todos khác nhau mỗi khi hàm này dc gọi
        // naive approach
        // setTodos([
        //     ...todos,
        //     { id: crypto.randomUUID(), title: newItem, completed: false }
        // ])
        // setTodos([
        //     ...todos,
        //     { id: crypto.randomUUID(), title: newItem, completed: false }
        // ])
        // nếu đúng thì ở đây sẽ thêm 2 todos vào list nhma vì state khi lấy thằng ...todos nó chỉ lấy thằng 
        // gần nhất được render nên khi set 2 lần v thì lần 2 sẽ overwrite lần 1 và kết quả chỉ 1 todos 2 được add

        // correct approach
        // setTodos((currentTodos) => {
        //     return [...currentTodos, { id:crypto.randomUUID(), title: newItem, completed: false }]
        // })
        // setTodos((currentTodos) => {
        //     return [...currentTodos, { id:crypto.randomUUID(), title: newItem, completed: false }]
        // })

        onSubmit(newItem)

        setNewItem("")
    }

   

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="">New Item</label>
                <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item"/>
            </div>
            <button className="btn">Add</button>
        </form>
    )
}