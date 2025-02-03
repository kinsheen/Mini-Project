import axios from "axios";

// Define your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Define a function to create an instance of axios with some defaults
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, PUT",
    "Access-Control-Allow-Credentials": true,
  },
});

// Define a function to make a global API call
export const callApi = async <T,>(
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
): Promise<T> => {
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data: { ...data },
    });
    if (
      response.status == 200 ||
      response.status == 201 ||
      response.status == 204
    ) {
      return response.data;
    } else {
      throw new Error("Error: " + response.statusText);
    }
    // If the API call is successful, return the dta

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // If the API call fails, throw an error
    throw new Error("An error occurred");
  }
};
