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
  priority: boolean
) => {
  const response = await callApi<toDoResponseArray | undefined>(
    "post",
    "/api/to-do",
    {
      day,
      task,
      status,
      priority,
    }
  );
  console.log("createToDo Response:", response);
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

export const addAchievement = async (description: string) => {
  const response = await callApi("post", "/api/achievements", {
    description,
  })
  console.log("addAchievement Response:", response)
  return response
}

export const getAchievements = async () => {
  const response = await callApi("get", "/api/achievements", {})
  console.log("getAchievements Response:", response)
  return response
}
