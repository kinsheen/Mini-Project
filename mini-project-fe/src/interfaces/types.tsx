export type toDoResponse = {
  id: string;
  day: string;
  task: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type toDoResponseArray = toDoResponse[];
