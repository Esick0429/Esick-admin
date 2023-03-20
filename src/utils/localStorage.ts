export const getLocalStorage = (value: string) => {
  return localStorage.getItem(value);
};
export const setLocalStorage = (value: string) => {
  localStorage.setItem(value, value);
};
export const removeLocalStorage = (value: string) => {
  localStorage.removeItem(value);
};
