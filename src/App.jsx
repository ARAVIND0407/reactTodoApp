import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completetedTodos, setCompletetedTodos] = useState(true)

  useEffect(() => {
    let isData = localStorage.getItem("todos");
    if (isData) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const handleInput = (e) => {
    setTodo(e.target.value);
  }
  const handleSave = () => {
    if(todo.length>=4){
      setTodos([...todos, { todo, isCompleted: false, id: uuidv4() }]);
      setTodo("");
      saveToLS();
    }
  }
  const handleEdit = (e, id) => {
    let editTodo = todos.filter(item => {
      return item.id === id;
    })
    setTodo(editTodo[0].todo)
    handleDelete(null, id, true);
  }
  const handleDelete = (e, id, fromEdit = false) => {
    let conf = true
    if (!fromEdit) {
      let conf = confirm("Are you sure want to delete this todo? This action cannot be undone");
      toast.error("Todo deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: {
          borderTop: "1px solid rgb(167 139 250)",
          borderBottom: "1px solid rgb(167 139 250)",
          backgroundColor: "rgb(15 23 42)",
          color: "white"
        }
      })
    }
    if (conf) {
      let newTodos = todos.filter(item => {
        return item.id !== id;
      })
      setTodos(newTodos);
    }
  }
  const handleIsComplete = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }
  const handleShowCompletedTodos = () => {
    setCompletetedTodos(!completetedTodos)
  }
  const handleKeydown = (e) => {
    if(e.key==="Enter"){
      handleSave();
    }
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="md:container mx-auto p-5 rounded-xl bg-slate-400 mt-[4rem] min-h-[90vh] md:w-[70vw] flex flex-col">
        <h1 className="font-bold text-xl">Your todos</h1>
        <div>
          <label htmlFor="showCompleted">Show completed todos</label>
          <input type="checkbox" id="showCompleted" name="showCompleted" className="mx-3 my-5" checked={completetedTodos} onChange={handleShowCompletedTodos} />
        </div>
        <div className="my-5">
          <input className="outline-none w-1/2 rounded-lg px-4 py-2" type="text" name="data" value={todo} onChange={handleInput} onKeyDown={handleKeydown} />
          <button className="bg-slate-500 px-4 rounded-md mx-3 py-2 text-white disabled:bg-slate-300 transition-all duration-500 hover:bg-green-800" onClick={handleSave} disabled={todo.length <= 3}>Save</button>
        </div>
        {todos.length === 0 ? <div>No todos available</div> : ""}
        {todos.map((item) => {
          return (completetedTodos || !item.isCompleted) && <div key={item.id} className="todos">
            <div className="todo flex w-1/2 justify-between my-5">
              <div className="flex">
                <input className="mr-3" name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleIsComplete} />
                <h2 className={item.isCompleted ? "line-through" : ""}>{item.todo}</h2>
              </div>
              <div className="flex items-center">
                <button className="bg-slate-500 mx-2 px-2 rounded-md text-white p-2  hover:bg-green-600 transition-colors duration-500" onClick={(e) => handleEdit(e, item.id)}><MdEdit /></button>
                <button className="bg-slate-500 px-2 rounded-md text-white p-2 hover:bg-red-600 transition-colors duration-500" onClick={(e) => handleDelete(e, item.id)}><MdDelete /></button>
              </div>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
