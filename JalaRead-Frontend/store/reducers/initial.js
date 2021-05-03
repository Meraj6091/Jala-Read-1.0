import { ADD_USER } from "../constants";

const initialState = {
  user: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      console.log(action)
      return {
        ...state,
        user: action.payload,
      };
    }

    default:
      return state;
  }
}
