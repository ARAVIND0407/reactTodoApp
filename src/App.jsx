import { useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const handleInput = (e) => {
    setTodo(e.target.value);
  }
  const handleSave = () => {
    setTodos([...todos, { todo, isCompleted: false, id: uuidv4() }]);
    setTodo("");
  }
  const handleEdit = () => {

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos)
  }
  const handleIsComplete = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5 rounded-xl bg-slate-200 my-5 min-h-[90vh]">
        <h1 className="font-bold text-xl">Your todos</h1>
        <div className="my-5">
          <input className="outline-none w-1/2 rounded-lg px-4" type="text" name="data" value={todo} onChange={handleInput} />
          <button className="bg-slate-500 px-2 rounded-md mx-3 text-white disabled:bg-slate-300 transition-all duration-500" onClick={handleSave} disabled={todo.length <= 3}>Save</button>
        </div>
        {todos.map((item) => {
          return <div key={item.id} className="todos">
            <div className="todo flex w-1/2 justify-between my-5">
              <div className="flex">
                <input className="mr-3" name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleIsComplete} />
                <h2 className={item.isCompleted ? "line-through" : ""}>{item.todo}</h2>
              </div>
              <div>
                <button className="bg-slate-500 mx-2 px-2 rounded-md text-white" onClick={handleEdit}>edit</button>
                <button className="bg-slate-500 px-2 rounded-md text-white" onClick={(e)=>handleDelete(e, item.id)}>delete</button>
              </div>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
