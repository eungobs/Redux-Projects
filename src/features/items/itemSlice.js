import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',  // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    getItems: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.status = 'succeeded';
    },
    updateItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedItem }; // Merge updates
        state.status = 'succeeded';
      } else {
        state.status = 'failed'; // Item not found
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.status = 'succeeded';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { getItems, addItem, updateItem, deleteItem, setStatus, setError } = itemSlice.actions;

export const fetchItems = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get('http://localhost:5000/items');
    dispatch(getItems(response.data));
  } catch (error) {
    dispatch(setError('Failed to fetch items'));
    console.error('Failed to fetch items:', error);
  }
};

export const createItem = (item) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.post('http://localhost:5000/items', item);
    dispatch(addItem(response.data));
  } catch (error) {
    dispatch(setError('Failed to add item'));
    console.error('Failed to add item:', error);
  }
};

export const editItem = (id, updatedItem) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.put(`http://localhost:5000/items/${id}`, updatedItem);
    dispatch(updateItem({ id, updatedItem: response.data })); // Use response data
  } catch (error) {
    dispatch(setError('Failed to update item'));
    console.error('Failed to update item:', error);
  }
};

export const removeItem = (id) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    await axios.delete(`http://localhost:5000/items/${id}`);
    dispatch(deleteItem(id));
  } catch (error) {
    dispatch(setError('Failed to delete item'));
    console.error('Failed to delete item:', error);
  }
};

export default itemSlice.reducer;
