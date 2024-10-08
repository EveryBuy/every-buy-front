export type User = {
  userId: string | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  userPhotoUrl: string | null;
};

export type AuthState = {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isDeleted?: boolean;
};

export type UserRegisterData = {
  email: string;
  phone: string;
  password: string;
};

export type UserLogData = {
  login: string;
  password: string;
};

export type AuthResponse = {
  data: User;
  token: string;
};

export type UserRegData = {
  email: string;
  phone: string;
  password: string;
};

export type UserDeleteData = {
  code: string | null;
  password?: string | null;
};

export type DeleteResponse = {
  message: string;
};

export type UserChgPwdData = {
  oldPassword: string;
  newPassword: string;
};

export type UserFullName = {
  fullName: string;
};

export type ChangePhoneData = {
  password: string,
  newPhoneNumber: string
}