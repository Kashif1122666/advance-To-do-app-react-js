import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTask from '../components/CreateTasks'
import ListTasks from '../components/ListTasks'
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  

  return (
    <DndProvider backend={HTML5Backend}>
    
    <Toaster/>
    <div className='bg-slate-100 w-screen h-screen flex flex-col 
      items-center p-3 gap-16 pt-32'>
      <CreateTask tasks={tasks} setTasks={setTasks}/>
      <ListTasks tasks={tasks} setTasks={setTasks}/>
    </div>
    </DndProvider>
  )
}

export default App
