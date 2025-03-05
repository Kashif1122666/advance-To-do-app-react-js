import React, { useEffect, useState } from 'react'

const ListTasks = ({tasks,setTasks}) => {

  const [todos,setTodos] = useState([]);
  const [inprogress,setInprogress] = useState([]);
  const [completed,setCompleted] = useState([]);

 useEffect(()=>{

  const fTodos = tasks.filter((task)=> task.status === "todo")
  const fInprogress = tasks.filter((task)=> task.status === "inprogress")
  const fCompleted = tasks.filter((task)=> task.status === "completed")

 },[tasks]);

 const statuses  = ["todo","inprogress","completed"]

  return (
    <div >
      {statuses.map((stat,index)=> <Section  key={index} status = {stat}/>)}
      </div>
  )
}

export default ListTasks

const Section = ({status})=>{
  return <div className='flex flex-col'>{status}</div>
};