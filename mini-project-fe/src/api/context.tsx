import { toDoResponseArray } from "../interfaces/types";
import { callApi } from "../services/services";

export const getTodoPriorityList = async () => {
  const response = await callApi<toDoResponseArray | undefined>(
    "get",
    "/api/to-do",
    {}
  );
  console.log("1st Response:", response);
  return response;
};
