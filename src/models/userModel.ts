export interface ClientUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
