import {
  loginResponse,
  TaskProps,
  toDoResponseArray,
  UpdateTaskProps,
  userResponse,
  userResponseArray,
} from "../interfaces/types";
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
  createdAt: string
) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "post",
    "/api/to-do/create",
    {
      day,
      task,
      status,
      is_priority,
      createdAt,
    }
  );
  console.log("createToDo Response:", response);
  return response;
};

//ChangePassword
export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "put",
    `/api/auth/change-password`,
    { oldPassword, newPassword }
  );
  console.log("changePassword Response:", response);
  return response;
};

//createUser
export const createUser = async (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  status: string
) => {
  const response = await callApi<userResponse | undefined>(
    "post",
    "/api/user/create",
    {
      firstname,
      lastname,
      username,
      email,
      password,
      status,
    }
  );
  console.log("createUser Response:", response);
  return response;
};

//Login
export const logIn = async (email: string, password: string) => {
  const response = await callApi<loginResponse | undefined>(
    "post",
    `/api/auth/login`,
    { email, password }
  );
  console.log("logIn Response:", response);
  return response;
};

//getTodoByUserId
export const getTodoByUserId = async (id: string) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "get",
    `/api/to-do/get?id=${id}`,
    {}
  );
  console.log("getTodoByUserId Response:", response);
  return response;
};

//getUser
export const getUser = async () => {
  const response = await callApi<userResponseArray>("get", "api/user", {});
  console.log("getUser Response:", response);
  return response;
};

//getUserId
export const getUserId = async () => {
  const response = await callApi<userResponse | undefined>(
    "get",
    `/api/auth/me`,
    {}
  );
  console.log("getUserId Response:", response);
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
    `/api/to-do/update`,
    { id, is_priority, status, note }
  );
  console.log("updateTodo Response:", response);
  return response;
};

export const updateTask = async (data: UpdateTaskProps): Promise<TaskProps> => {
  const response = await callApi<TaskProps>("put", `/api/to-do/update`, data);

  console.log("Update Task Response:", response);
  return response;
};

export const getToDoByField = async (
  field: string,
  value: string
): Promise<TaskProps[] | []> => {
  try {
    const response = await callApi<TaskProps[]>(
      "get",
      `/api/to-do/find/?field=${field}&value=${value}`,
      {}
    );
    console.log("GetToDoByField Response:", response);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};
