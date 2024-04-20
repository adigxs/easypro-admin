export type actionsType = "add" | "edit";

export interface User {
  id?: string;
  email: string;
  username: string;
  last_name: string;
  first_name?: string;
  phone?: string;
  court?: string;
  createdAt?: string;
  region?: string;
}

export interface UserLoginResponse extends User {
  is_csa?: boolean;
  region?: any;
}

export interface AgentRequest extends User {
  password: string;
}

export interface AgentUpdateRequest extends User {}

export interface AgentPaginate {
  results: User[];
  count: number;
  // pageSize: number;
  // totalResults: number;
  // totalPages: number;
}

export interface UserPasswordRequest {
  currentPassword: string;
  newPassword: string;
}
