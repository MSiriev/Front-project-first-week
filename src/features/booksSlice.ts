import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { builders } from "prettier/doc.js";

const initialState = {
  books: [],
  error: null,
  currentPage: 1,
  perPage: 8,
  inputValue: '',
};


export const fetchBooks = createAsyncThunk(
  "fetch/Books",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3040/books", {
        method: "GET",
      });

      const books = await res.json();

      if (books.error) {
        return thunkAPI.rejectWithValue(books.error);
      }

      return books;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {

    takeSearch(state, action) {
      state.inputValue = action.payload
    },
    changePage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchBooks.pending, (state, action) => {});
  },
});

export const { changePage, takeSearch } = booksSlice.actions;
export default booksSlice.reducer;
