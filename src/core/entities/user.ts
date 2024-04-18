export type actionsType = "add" | "edit";

export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  createdAt?: string;
}

export interface AgentRequest extends User {
  password: string;
}

export interface AgentUpdateRequest extends User {}

export interface AgentPaginate {
  data: User[];
  page: number;
  pageSize: number;
  totalResults: number;
  totalPages: number;
}

export interface UserPasswordRequest {
  currentPassword: string;
  newPassword: string;
}
