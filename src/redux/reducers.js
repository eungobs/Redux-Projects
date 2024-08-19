import { FETCH_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SET_LOADING } from './actions';

const initialState = {
  items: [],
  loading: false,
};

export const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.updatedItem } : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
