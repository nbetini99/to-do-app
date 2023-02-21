"use client";

import * as React from "react";

import DeleteIcon from "../../public/svg/delete.svg";
import EditIcon from "../../public/svg/edit.svg";
import CalendarIcon from "../../public/svg/calendar.svg";
import CheckIcon from '../../public/svg/check.svg';

import dayjs from "dayjs";
import Modal from "@mui/material/Modal";

const api = "http://localhost:3000/api";


async function addTask(task) {
  const res = await fetch(`${api}/tasks/add`, {
    method: "POST",
    body: JSON.stringify(task),
  });

async function deleteTask(id) {
  const res = await fetch(`${api}/tasks/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

  return await res.json();
}

async function editTask(task) {
  const res = await fetch(`${api}/tasks/update`, {
    method: "PUT",
    body: JSON.stringify(task),
  });

  return res.json();
}

export default function Tasks(props) {
  let formEle = React.useRef<HTMLFormElement>();

  const [tasks, setTasks] = React.useState(props.tasks);
  const [task, setTask] = React.useState({
    name: "",
    id: "",
    duedate: "",
    desc: "",
    completed: false,
    todoId: props.todoId,
  });
  const [mode, setMode] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (mode) => {
    setOpen(true);
    setMode(mode);
  };

  const handleClose = () => {
    setOpen(false);
    setMode(false);
    setTask({
      name: "",
      id: "",
      duedate: "",
      desc: "",
      completed: false,
      todoId: props.todoId,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTask((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const editTaskItem = (task) => {
    handleOpen(true);
    setTask(task);
  };

  const deleteTaskItem = async (id) => {
    try {
      const { msg } = await deleteTask(id);

      if (msg === "Task is deleted successfully") {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (task) => {
    try {
      task.completed = !task.completed;

      const { msg } = await editTask(task);

      if (msg === "Task updated successfully") {
        const tempTasks = [...tasks];
        const index = tempTasks.findIndex((t) => t.id === task.id);
        tempTasks[index] = task;

        setTasks(tempTasks);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode) {
        const { msg } = await editTask(task);

        if (msg === "Task updated successfully") {
          const tempTasks = [...tasks];
          const index = tempTasks.findIndex((t) => t.id === task.id);
          tempTasks[index] = task;

          setTasks(tempTasks);
        }

        handleClose();
      } else {
        const { newTask } = await addTask(task);

        setTasks((prev) => [...prev, newTask]);
        handleClose();
      }
    } catch (error) {}
  };

  return (
    <>
      {tasks.map((task, idx) => {
        return (
          <div className="task" key={idx}>
            <div className={`task-indicator risk ${task.completed ? 'completed' : 'group/indicator'}`} onClick={() => completeTask(task)}>
              <CheckIcon className={`w-2 h-2 group-hover/indicator:visible ${task.completed ? '' : 'invisible'}`} />
            </div>
            <div className="task-content">
              <div className={`task-title ${task.completed ? 'completed' : ''}`}>{task.name}</div>
              <p className="task-desc">{task.desc}</p>
              <div className="task-due">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{dayjs(task.duedate).format("MMM D, YYYY")}</span>
              </div>
            </div>
            <div className="task-actions">
              <button
                type="button"
                className="icon-button"
                onClick={() => editTaskItem(task)}
              >
                <EditIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="icon-button"
                onClick={() => deleteTaskItem(task.id)}
              >
                <DeleteIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
      <div className="py-2">
        <button
          type="button"
          className="icon-button"
          onClick={() => handleOpen(false)}
        >
          + Add Task
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <form action="#" onSubmit={handleSubmit} ref={formEle}>
              <div className="overflow-hidden rounded-lg border border-gray-300">
                <label htmlFor="title" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
                  placeholder="Task name"
                  onChange={handleInputChange}
                  value={task.name}
                />
                <label htmlFor="description" className="sr-only">
                  Description
                </label>
                <textarea
                  rows={5}
                  name="desc"
                  id="desc"
                  className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Write a description..."
                  onChange={handleInputChange}
                  value={task.desc}
                ></textarea>
              </div>
              <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                <div className="flex">
                  <input
                    type="date"
                    name="duedate"
                    id="duedate"
                    className="date-picker"
                    placeholder="Due date"
                    onChange={handleInputChange}
                    value={task.duedate}
                  />
                </div>
                <div className="flex items-center flex-shrink-0 space-x-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-button">
                    { mode ? 'Update Task' : 'Add Task' }
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
