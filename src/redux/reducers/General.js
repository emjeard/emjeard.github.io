const gen_hp_data = (state, action) => {
  const stateName = action.type;
  return {
    ...state,
    [stateName]: action.data,
  };
};

export default gen_hp_data;
