export const validatePhone = (phone: string) => {
  const phoneRegex = /^\+?[0-9]{9,15}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).{8,}$/;
  return passwordRegex.test(password);
};
