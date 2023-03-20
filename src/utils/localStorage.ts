export const getLocalStorage = (value: string) => {
  return localStorage.getItem(value);
};
export const setLocalStorage = (name:string,value: string,) => {
  localStorage.setItem(name, value);
};
export const removeLocalStorage = (value: string) => {
  localStorage.removeItem(value);
};
