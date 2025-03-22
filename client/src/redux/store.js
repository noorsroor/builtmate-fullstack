import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
  },
});

export default store;
