import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setTodos(tasks.filter((task) => task.status === "todo"));
    setInprogress(tasks.filter((task) => task.status === "inprogress"));
    setCompleted(tasks.filter((task) => task.status === "completed"));
  }, [tasks]);

  const statuses = ["todo", "inprogress", "completed"];

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
      {statuses.map((stat, index) => {
        let tasksToShow = [];
        if (stat === "todo") tasksToShow = todos;
        if (stat === "inprogress") tasksToShow = inprogress;
        if (stat === "completed") tasksToShow = completed;

        return (
          <Section
            key={index}
            status={stat}
            tasks={tasksToShow} // ✅ Pass only relevant tasks
            setTasks={setTasks}
          />
        );
      })}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks = [], setTasks }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "To Do";
  let bg = "bg-blue-500";

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-yellow-500";
  } else if (status === "completed") {
    text = "Completed";
    bg = "bg-green-500";
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((t) =>
        t.id === id ? { ...t, status: status } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast.success("Task status changed 🚀");
      return updatedTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-full max-w-xs md:w-64 rounded-md p-4 shadow-md transition-all ${
        isOver ? "bg-gray-200" : "bg-white"
      }`}
    >
      <Header text={text} bg={bg} count={tasks.length} />
      {tasks.length > 0 ? (
        tasks.map((task) => <Task key={task.id} task={task} setTasks={setTasks} />)
      ) : (
        <p className="text-gray-400 text-center mt-4">No tasks here</p>
      )}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 px-4 rounded-md uppercase text-sm text-white justify-between`}
    >
      {text}
      <div className="bg-white w-6 h-6 text-black rounded-full flex items-center justify-center text-xs">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast("Task removed 💀");
      return updatedTasks;
    });
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-4 shadow-md rounded-md cursor-grab transition-all ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p className="text-gray-800 font-medium">{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-gray-500 hover:text-red-500 transition-all"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};
