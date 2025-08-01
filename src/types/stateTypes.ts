export type User = {
  userId: number | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  userPhotoUrl: string | null;
};

export type Error = any;

export type AuthState = {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isDeleted?: boolean;
  error: Error | null;
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
  oldPassword: string | undefined;
  newPassword: string | undefined;
};

export type UserFullName = {
  fullName: string;
};

export type ChangePhoneData = {
  password: string,
  newPhoneNumber: string
}

export type ChangeEmailData = {
  password: string,
  newEmail: string
}