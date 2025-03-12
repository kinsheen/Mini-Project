export type toDoResponseArray = toDoResponse[];

export type toDoResponse = {
  id: number;
  day: string;
  task: string;
  status: string;
  is_priority: boolean;
  note: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
};

export type loginResponse = {
  message: string;
  userStatus: string;
  userRole: string;
  token: string;
};

export type userResponse = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type userResponseArray = userResponse[];

export const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export enum status {
  done = "Done",
  inProgress = "In Progress",
  unassigned = "Unassigned",
}

export type TaskProps = {
  id: number;
  userId: number;
  task: string;
  note?: string;
  status: TaskStatus;
  is_priority: boolean;
  day: string;
  createdAt: string;
  updatedAt: string;
};

export enum TaskField {
  STATUS = "status",
}

export enum TaskStatus {
  IN_PROGRESS = "In Progress",
  DONE = "Done",
  PENDING = "Pending",
}

export type UpdateTaskProps = {
  id: number;
  is_priority?: boolean;
  status?: string;
  task?: string;
  note?: string;
};
