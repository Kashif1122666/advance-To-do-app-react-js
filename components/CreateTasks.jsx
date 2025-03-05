import { useState } from "react";
import toast from "react-hot-toast";
import {v4  as uuidv4} from 'uuid'; 


const CreateTask = ({tasks,setTasks})=>{
    const [task,setTask] = useState({
        id:"",
        name:"",
        status:"todo", // it can also be in progress or completed
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (task.name.length < 3 ){
             return toast.error("A task must have more than 3 characters")};
        if (task.name.length > 40 ) {
            return toast.error("A task must not be  more than 40 characters")};
        setTasks((prev)=>{
             const list  = [...prev,task];
             localStorage.setItem("tasks",JSON.stringify(list));
             console.log(prev);
             return list;
        });
        toast.success("Task created");
        setTask({
            id:"",
            name:"",
            status:"todo", // it can also be in progress or completed
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