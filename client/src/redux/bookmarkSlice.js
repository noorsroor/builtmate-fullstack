import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Axios instance with baseURL

// Fetch user's bookmarks
export const fetchBookmarks = createAsyncThunk("bookmarks/fetch", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/bookmarks");
        return response.data.bookmarks;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add professional to bookmarks
export const addProfessional = createAsyncThunk("bookmarks/addPro", async (proId, { rejectWithValue, dispatch }) => {
    try {
        await axios.post("/bookmarks/add-professional", { proId });
        dispatch(fetchBookmarks()); // Refresh bookmarks
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Remove professional from bookmarks
export const removeProfessional = createAsyncThunk("bookmarks/removePro", async (proId, { rejectWithValue, dispatch }) => {
    try {
        await axios.post("/bookmarks/remove-professional", { proId });
        dispatch(fetchBookmarks());
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add project to bookmarks
export const addProject = createAsyncThunk("bookmarks/addProject", async (projectId, { rejectWithValue, dispatch }) => {
    try {
        await axios.post("/bookmarks/add-project", { projectId });
        dispatch(fetchBookmarks());
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Remove project from bookmarks
export const removeProject = createAsyncThunk("bookmarks/removeProject", async (projectId, { rejectWithValue, dispatch }) => {
    try {
        await axios.post("/bookmarks/remove-project", { projectId });
        dispatch(fetchBookmarks());
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create the slice
const bookmarkSlice = createSlice({
    name: "bookmarks",
    initialState: {
        professionals: [],
        projects: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmarks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookmarks.fulfilled, (state, action) => {
                state.loading = false;
                state.professionals = action.payload.professionals || [];
                state.projects = action.payload.projects || [];
            })
            .addCase(fetchBookmarks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookmarkSlice.reducer;
