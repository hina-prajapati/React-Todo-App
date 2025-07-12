import { useEffect, useState } from "react";

function TodoApp() {

    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [search, setSearch] = useState('');

    const handlSubmitBtn = (e) => {
        if (todo === '') {
            alert("Pls Enter TODO!");
            return;
        }

        let updateList = [...todoList];

        if (editIndex !== null) {

            updateList[editIndex] = todo;

            setEditIndex(null)
            console.log(editIndex)
        }
        else {
            updateList.push(todo);
        }

        setTodoList(updateList);
        setTodo('');
    }

    const handleDeleteBtn = (index) => {
        let updateList = todoList.filter((_, i) => i !== index);
        if(editIndex !==null){
            setEditIndex("");
            setTodo("");
        }
        setTodoList(updateList)
    }

    const handleEditBtn = (index) => {
        setTodo(todoList[index]);
        setEditIndex(index);
    }

    return (
        <>
            <h1>Todo App</h1>
            <input type="text" name="name" id="todo" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Enter todo......" />
            <button onClick={handlSubmitBtn}> {editIndex !== null ? "Update Todo" : "Add Todo"}</button>
            <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="SEarch todo" />
            <ul>
                {todoList
                .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
                .map((todo, index) => (
                    <li key={index}>{todo}
                        <button onClick={() => handleDeleteBtn(index)}>DELETE</button>
                        <button onClick={() => handleEditBtn(index)}>EDIT</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TodoApp;