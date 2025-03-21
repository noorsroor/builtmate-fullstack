import { createSlice } from '@reduxjs/toolkit';

// Load language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: savedLanguage,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload); // Save to localStorage
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
