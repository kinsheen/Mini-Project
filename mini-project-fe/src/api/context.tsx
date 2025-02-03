import { toDoResponseArray } from "../interfaces/types";
import { callApi } from "../services/services";

//getTodoPriorityList
export const getTodoPriorityList = async () => {
  const response = await callApi<toDoResponseArray | undefined>(
    "get",
    "/api/to-do",
    {}
  );
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
