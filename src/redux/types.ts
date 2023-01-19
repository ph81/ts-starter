export type UserState = {
  userId: string;
  name?: string;
  email?: string;
  avatar?: string;
};

export type MutateUser = {
  name?: string;
  email?: string;
  avatar?: string;
};

export type IGenericResponse = {
  status: string;
  message: string;
};

export type UserResponse = {
  status: string;
  User: UserState;
};

export type UsersResponse = {
  status: string;
  results: number;
  Users: UserState[];
};
