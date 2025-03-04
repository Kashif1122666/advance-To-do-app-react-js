import { useState } from "react";
// import {v4  as uuidv4} from 'uuid'; 
// installation npm install uuid   use it like uuidv4();


const CreateTask = ({tasks,setTasks})=>{
    const [task,setTask] = useState({
        id:"",
        name:"",
        status:"todo", // it can also be in progress or completed
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        setTasks((prev)=>{
             const list  = [...prev,task];
             localStorage.setItem("tasks",JSON.stringify(list));
             return list;
        });
    };
    return(

        <form onSubmit={handleSubmit}>
            <input  onChange={(e)=>{
                       setTask({...task, id:uuidv4(),  name: e.target.value})
            }}
            value={task.name}
             type="text" className="border-2 border-slate-400  bg-slate-100 rounded-md mr-4 h-12  w-64 px-1"/>
            <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create</button>
        </form>
    )
}
export default CreateTask;