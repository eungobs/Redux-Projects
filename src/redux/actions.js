import axios from 'axios';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_LOADING = 'SET_LOADING';

// Replace with your JSON Server URL
const API_URL = 'http://localhost:5000/items';

export const fetchItems = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  const response = await axios.get(API_URL);
  dispatch({ type: FETCH_ITEMS, payload: response.data });
  dispatch({ type: SET_LOADING, payload: false });
};

export const addItem = (item) => async (dispatch) => {
  await axios.post(API_URL, item);
  dispatch({ type: ADD_ITEM, payload: item });
};

export const updateItem = (id, updatedItem) => async (dispatch) => {
  await axios.put(`${API_URL}/${id}`, updatedItem);
  dispatch({ type: UPDATE_ITEM, payload: { id, updatedItem } });
};

export const deleteItem = (id) => async (dispatch) => {
  await axios.delete(`${API_URL}/${id}`);
  dispatch({ type: DELETE_ITEM, payload: id });
};
