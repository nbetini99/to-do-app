"use client";
import * as React from "react";
import PlusIcon from "../../public/svg/plus.svg";
import Calendar from "../../public/svg/calendar.svg";
import Today from "../../public/svg/today.svg";
import Modal from "@mui/material/Modal";
import Link from "next/link";

async function addTodo(name, color) {
  const res = await fetch(`http://localhost:3000/api/todos/add`, {
    method: "POST",
    body: JSON.stringify({ name, color }),
  });

  return res.json();
}

export default function TodoList(props) {
  const [selected, setSelected] = React.useState('upcoming');
  const [todos, setTodos] = React.useState(props.todos);
  const [todo, setTodo] = React.useState({
    name: "",
    color: "",
    id: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTodo({
      name: "",
      color: "",
      id: "",
    });
  };

  const colors = ["lime", "blue", "amber", "indigo", "cyan", "emerald"];

  const addTodoList = async (e) => {
    try {
      const { newTodo } = await addTodo(todo.name, todo.color);

      setTodos((prev) => [...prev, newTodo]);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTodo((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="todo-lists">
        <nav>
          <a href="/" className={`nav-item compact ${selected === 'upcoming' ? 'selected' : ''}`} onClick={() => setSelected('upcoming')}>
            <Calendar className="mr-3 w-4 h-4" />
            <span className="truncate">Upcoming</span>
          </a>
          <a href="#" className="nav-item compact">
            <Today className="mr-3 w-4 h-4" />
            <span className="truncate">Today</span>
          </a>
        </nav>
      </div>
      <div className="todo-lists">
        <header className="nav-header">
          <h4>Todo Lists</h4>
          <button type="button" className="icon-button" onClick={handleOpen}>
            <PlusIcon className="w-4 h-4 mr-1" />
            <span className="text-sm">New</span>
          </button>
        </header>
        <nav>
          {todos.map((todo, idx) => {
            return (
              <Link
                href={`/todo-list/${todo.id}`}
                className={`nav-item ${selected === todo.id ? 'selected' : ''}`}
                key={idx}
                onClick={() => setSelected(todo.id)}
              >
                <span className={`indicator ${todo?.color}`}></span>
                <span className="truncate">{todo?.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <h2 className="font-bold text-xl">New List</h2>

              <form className="mt-6">
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    List Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      value={todo.name}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Todo list name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <legend className="block text-sm font-medium text-gray-700">
                    Choose a label color
                  </legend>
                  <div className="mt-4 flex items-center space-x-3">
                    {colors.map((color, idx) => {
                      return (
                        <label className={`color-choice ${color}`} key={idx}>
                          <input
                            type="radio"
                            name="color"
                            value={color}
                            className="sr-only"
                            aria-labelledby="color-choice-0-label"
                            onChange={handleInputChange}
                          />

                          <span
                            aria-hidden="true"
                            className={`circle ${color}`}
                          ></span>
                          <span id="color-choice-0-label" className="sr-only">
                            {color}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>&nbsp;</div>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-button"
                  onClick={addTodoList}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
