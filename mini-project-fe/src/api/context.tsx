import { toDoResponseArray } from "../interfaces/types";
import { callApi } from "../services/services";

//getTodoPriorityList
export const getTodoPriorityList = async () => {
  const response = await callApi<toDoResponseArray>("get", "/api/to-do", {});
  return response;
};

//createToDo
export const postCreateToDo = async (
  day: string,
  task: string,
  status: string,
  is_priority: boolean,
  created_at: string
) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "post",
    "/api/to-do",
    {
      day,
      task,
      status,
      is_priority,
      created_at,
    }
  );
  console.log("createToDo Response:", response);
  return response;
};

//updateTodo

//deleteTodo
export const deleteTodo = async (id: string) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "delete",
    `/api/to-do/${id}`,
    {}
  );
  console.log("deleteTodo Response:", response);
  return response;
};

//updateTodo
export const updateTodo = async (
  id: string,
  is_priority: boolean,
  status?: string,
  note?: string
) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "put",
    `/api/to-do/${id}`,
    { is_priority, status, note }
  );
  console.log("updateTodo Response:", response);
  return response;
};

export const addAchievement = async (description: string) => {
  const response = await callApi("post", "/api/achievements", {
    description,
  });
  console.log("addAchievement Response:", response);
  return response;
};

export const getAchievements = async () => {
  const response = await callApi("get", "/api/achievements", {});
  console.log("getAchievements Response:", response);
  return response;
};

export const deleteAchievement = async (id: string) => {
  const response = await callApi("delete", `/api/achievements/${id}`, {});
  console.log("deleteAchievement Response:", response);
  return response;
};

export const addToDoPriority = async (_id: string) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "put",
    `/api/to-do/${_id}`,
    {
      priority: true,
    }
  );
  console.log("AddToDoPriority Response:", response);
  return response;
};
