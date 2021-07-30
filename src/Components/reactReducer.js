export const localReducer = (action, state) => {
  if (
    action.name === "height" ||
    action.name === "width" ||
    action.name === "count"
  ) {
    const number = parseInt(action.payload, 10);

    if (action.name === "height" || action.name === "width") {
      if (action.payload === "") {
        return {
          ...state,
          size: {
            ...state.size,
            [action.name]: 0,
          },
        };
      }
      return {
        ...state,
        size: {
          ...state.size,
          [action.name]: number,
        },
      };
    }
    if (action.payload === "") {
      return {
        ...state,
        [action.name]: 0,
      };
    }
    return {
      ...state,
      [action.name]: number,
    };
  }
  return {
    ...state,
    [action.name]: action.payload,
  };
};

export const setData = (name, payload) => ({
  type: "SET_DATA",
  name,
  payload,
});
export const clearData = () => ({
  type: "CLEAR_DATA",
});
