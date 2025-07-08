// TODO:
// export const validatePhone = (phone: string) => {
//   const phoneRegex = /^\+[0-9]{12}$/;
//   // const phoneRegex = /^[0-9]{9}$/;
//   return phoneRegex.test(phone);
// };
export const validatePhone = (phone: string) => {
  const phoneRegex = /^(\+380\d{9}|380\d{9}|80\d{9}|0\d{9}|\d{9})$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const validateEmailOrPhone = (value: string) => {
  const phoneRegex = /^(\+380\d{9}|380\d{9}|80\d{9}|0\d{9}|\d{9})$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return phoneRegex.test(value) || emailRegex.test(value);
};
// TODO:
// export const validateEmailOrPhone = (emailOrPhone: string) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^\+\d{12}$/;
//   return emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone);
// };

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateInput = (input: string) => {
  const isValid = input.trim().length > 0;
  return isValid;
};

export const validateName = (name: string) => {
  const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ'’\-\s]{2,}$/u;
  return nameRegex.test(name);
};
