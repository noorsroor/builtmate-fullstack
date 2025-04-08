import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import authReducer from "./authSlice";
import filterReducer from "./filterSlice"
import bookmarkReducer from './bookmarkSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
    filter: filterReducer,
    bookmarks: bookmarkReducer,
  },
});

export default store;
