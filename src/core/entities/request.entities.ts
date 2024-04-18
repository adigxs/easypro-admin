export interface LoginRequest {
  username: string;
  password: string;
}

export interface AssignRequest {
  categoryId?: string;
  guestName?: string;
  tableId?: string;
  wendingId?: string;
  place?: number;
  guests?: any[];
}
