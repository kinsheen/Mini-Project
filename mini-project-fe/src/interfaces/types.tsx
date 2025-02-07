export type toDoResponseArray = toDoResponse[];

export type toDoResponse = {
  id: string;
  day: string;
  task: string;
  status: string;
  is_priority: boolean;
  note: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
};

export const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
