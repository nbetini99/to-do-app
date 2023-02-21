import { Task, Todo } from "@/app/types/types";
import { generateRandomNumber } from "@/app/utils/util";
import dayjs from "dayjs";
import Redis from "ioredis";

const redisClient = new Redis();

const fetchDataFromRedis = async (key) => {
  const dataString = await redisClient.get(key);

  if (dataString) {
    return JSON.parse(dataString);
  } else {
    return [];
  }
};

const setDataToRedis = (key, data) => {
  redisClient.set(key, JSON.stringify(data));
};

/**
 * Tasks Related APIs
 */
export const getAllTasks = async () => {
  return await fetchDataFromRedis("tasks");
};

export const getTasksByTodo = async (todoId) => {
  const tasks = await fetchDataFromRedis("tasks");

  return tasks.filter((task) => task.todoId === todoId);
};

export const createTask = async (task: Task) => {
  let tasks = await fetchDataFromRedis("tasks");

  const newTask = {
    ...task,
    id: "taskId" + generateRandomNumber(),
  };

  tasks.push(newTask);
  setDataToRedis("tasks", tasks);

  return newTask;
};

export const deleteTask = async (taskId) => {
  let tasks = await fetchDataFromRedis("tasks");

  tasks = tasks.filter((task) => {
    return task.id !== taskId;
  });

  setDataToRedis("tasks", tasks);
};

export const updateTask = async (task: Task) => {
  let newTasks = [];
  let tasks = await fetchDataFromRedis("tasks");

  tasks.map((obj) => {
    let newTask = { ...obj };
    if (obj.id == task.id) {
      newTask = task;
    }

    newTasks.push(newTask);
  });

  setDataToRedis("tasks", newTasks);
};

export const getUpcomingTasks = async () => {
  const tasks = await fetchDataFromRedis("tasks");

  let overDueTasks = [];

  tasks.forEach((task) => {
    let t = { ...task };

    if (dayjs().isAfter(t.duedate, "date") && t.completed === false) {

      overDueTasks.push(t);
    }
  });
    console.log(overDueTasks);
  return overDueTasks;
};

/**
 * Todos Related APIs
 */
export const getAllTodos = async () => {
  const todoLists = await redisClient.get("todos");
  let todos = [];

  if (todoLists) {
    todos = JSON.parse(todoLists);
  } else {
    console.log("No todos found, initializing with defaults...");

    todos = [
      {
        name: "Work Related",
        color: "lime",
        id: "id1",
      },
      {
        name: "Travelling Plans",
        color: "indigo",
        id: "id2",
      },
      {
        name: "Personal Tasks",
        color: "amber",
        id: "id3",
      },
      {
        name: "Documents Related",
        color: "blue",
        id: "id4",
      },
      {
        name: "Project Tasks",
        color: "emerald",
        id: "id5",
      },
    ];

    await redisClient.set("todos", JSON.stringify(todos));
  }

  return todos;
};

export const getTodo = async (todoId) => {
  const todos = await fetchDataFromRedis("todos");
  return todos.find((todo) => todo.id === todoId);
};

export const createTodo = async (todo: Todo) => {
  let todos = await fetchDataFromRedis("todos");
  const newTodo = {
    ...todo,
    id: "id" + generateRandomNumber(),
  };

  todos.push(newTodo);

  setDataToRedis("todos", todos);

  return newTodo;
};

export const deleteTodo = async (todoId) => {};

export const updateTodo = async (todo: Todo) => {};
