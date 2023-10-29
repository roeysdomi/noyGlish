interface TaskData {
  date: Date;
  task_text: string;
  user_solution?: string;
  grammar: string[];
}


// CRUD functions for tasks
const baseURL = "http://localhost:3000/tasks";

export const createTask = async (taskData: TaskData) => {
  const res = await fetch(`${baseURL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return await res.json();
};

export const getAllTasks = async () => {
  const res = await fetch(`${baseURL}/all`, { headers: { "Content-Type": "application/json" } });
  return await res.json();
};

export const updateTask = async (id: string, updatedTaskData: TaskData) => {
  const res = await fetch(`${baseURL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTaskData),
  });
  return await res.json();
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
