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

  export const nFormatter=(num)=> {
    let Number= parseInt(num)  ; 
    console.log(Number)
    if (Number >= 1000000000) {
       return (Number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (Number >= 1000000) {
       return (Number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (Number >= 1000) {
       return (Number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return Number;
}