import { RootState } from "../store"; 

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectToken = (state: RootState) => state.auth.token;
export const selectError = (state: RootState) => state.auth.error;

export const selectRehydrated = (state: RootState) =>
  Boolean((state.auth as any)._persist?.rehydrated);

