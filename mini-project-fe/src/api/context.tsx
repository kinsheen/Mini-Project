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
export const getTodoById = async (id: string) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "get",
    `/api/to-do/${id}`,
    {}
  );
  console.log("getTodoById Response:", response);
  return response;
};

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
  id: number,
  is_priority?: boolean,
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

//updateNotes
export const updateNotes = async (id: number, note: string) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "put",
    `/api/to-do/${id}`,
    { note }
  );
  console.log("updateNotes Response:", response);
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

export const getToDoByField = async (field: string, value: string) => {
  try {
    const response = await callApi<toDoResponseArray | undefined>(
      "get",
      `/api/to-do/${field}/${value}`,
      {}
    );
    console.log("getToDoByField Response:", response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
