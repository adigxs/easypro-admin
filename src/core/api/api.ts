import { get, patch, post } from "../api.interceptor";
import { AssignRequest, LoginRequest } from "../entities/request.entities";
import {
  AgentRequest,
  AgentUpdateRequest,
  UserPasswordRequest,
} from "../entities/user";

export const loginUser = async (body: LoginRequest) => {
  const res = await post("/login/", body);
  return await res.json();
};
export const createAgent = async (body: AgentRequest) => {
  const res = await post("/agents/", body);
  return await res.json();
};
export const updateAgent = async (userId: string, body: AgentUpdateRequest) => {
  const res = await patch(`/agents/${userId}/`, body);
  return await res.json();
};

export const getAllAgents = async (query?: string) => {
  const res = await get(`/agents/${query}`);
  return await res.json();
};

export const updateUserPassword = async (
  userId: string,
  password: UserPasswordRequest
) => {
  const res = await patch(`/api/change-password/`, password);
  return await res.json();
};

export const getAllRequests = async (query?: string) => {
  const res = await get(`/requests/${query}`);
  return await res.json();
};
