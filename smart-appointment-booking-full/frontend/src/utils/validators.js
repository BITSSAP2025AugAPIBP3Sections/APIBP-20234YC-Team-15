export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10,15}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateName = (name) => {
  return name && name.length >= 2 && name.length <= 100;
};