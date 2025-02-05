export type toDoResponseArray = toDoResponse[];

export type toDoResponse = {
  _id: string;
  day: string;
  task: string;
  status: string;
  priority: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
