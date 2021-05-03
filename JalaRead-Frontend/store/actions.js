import { ADD_USER } from "./constants";

export const addUser = (data) => ({
  type: ADD_USER,
  payload: data,
});
