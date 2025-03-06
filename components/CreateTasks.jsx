import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", // Default status
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3) {
      return toast.error("A task must have more than 3 characters");
    }
    if (task.name.length > 40) {
      return toast.error("A task must not be more than 40 characters");
    }

    const newTask = { ...task, id: uuidv4() };

    setTasks((prev) => {
      const list = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task created");
    setTask({ id: "", name: "", status: "todo" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg "
    >
      <input
        onChange={(e) => {
          setTask({ ...task, id: uuidv4(), name: e.target.value });
        }}
        value={task.name}
        type="text"
        placeholder="Enter task..."
        className="border-2 border-gray-400 bg-gray-100 rounded-md h-12 px-3 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button className="bg-blue-500 hover:bg-blue-600 transition-all text-white font-medium rounded-md px-6 h-12">
        Create
      </button>
    </form>
  );
};

export default CreateTask;
