import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: '',
  category: '',
  searchQuery: '', // New state for the search bar
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
})

export const { setLocation, setCategory, setSearchQuery } = filterSlice.actions
export default filterSlice.reducer
