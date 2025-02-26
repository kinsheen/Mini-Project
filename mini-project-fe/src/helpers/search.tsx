import { toDoResponseArray } from "../interfaces/types";

export const SearchComponent = (
  searchValue: string,
  searchArray: toDoResponseArray
) => {
  // Filter the data based on the search value
  const filteredData = searchArray.filter((item) => item.task === searchValue);
  return filteredData;
};
