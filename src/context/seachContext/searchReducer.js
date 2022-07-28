export const searchReducer = (state, action) => {
  const { type, query } = action;
  switch (type) {
    case 'CHANGE_SEARCH_TEXT':
      return { ...state, search: query };
    default:
      break;
  }
};
