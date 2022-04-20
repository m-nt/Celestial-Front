import {LOCALSTORAGE_PREFIX} from "./Conts";

export const setLocalStorage = (name, value) =>
  new Promise((resolve, reject) => {
    try {
      localStorage.setItem(LOCALSTORAGE_PREFIX + name, JSON.stringify(value));
      resolve();
    } catch (error) {
      reject(error);
    }
  });

export const getLocalStorage = (name) =>
  new Promise((resolve, reject) => {
    try {
      const data = localStorage.getItem(LOCALSTORAGE_PREFIX + name);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });

export const removeLocalStorage = (name) =>
  new Promise((resolve, reject) => {
    try {
      const data = localStorage.removeItem(LOCALSTORAGE_PREFIX + name);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
