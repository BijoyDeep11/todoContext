import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './Contexts/TodoContext'
import { TodoItem,TodoForm } from './Components'

function App() {
  const [todos, setTodos] = useState([])
const addTodo = (todo) => {
  setTodos((prev) => [{id: Date.now(),...todo},...prev])
}

const updatedTodo = (id, todo) =>{
  setTodos((prev) => prev.map((prevTodo) => (prevTodo.id) === id ? { ...prevTodo, ...todo } : prevTodo)) 
}

const toggleComplete = (id) => {
  setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
}

const deleteTodo = (id) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id))
}

useEffect(() => {
const todos = JSON.parse(localStorage.getItem("todos"))
if (todos && todos.length){
  setTodos(todos) 
}
},[])

useEffect(() => {
 localStorage.setItem("todos",JSON.stringify(todos))
}, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
  {/* Fullscreen centered wrapper */}
  <div className="h-full w-full bg-[#172842] overflow-hidden flex items-center justify-center">

    {/* Centered todo box */}
    <div className="w-full max-w-3xl px-6 text-white flex flex-col">

      <h1 className="text-3xl font-bold text-center mb-6">
        Manage Your Todos
      </h1>

      <div className="mb-4">
        <TodoForm />
      </div>

      {/* Internal scroll ONLY */}
      <div className="flex-1 overflow-y-auto">
        {todos.map((todo) => (
          <div key={todo.id} className="mb-3">
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>
    </div>

  </div>
</TodoProvider>





  )
}

export default App
