import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { builders } from "prettier/doc.js";

const initialState = {
  books: [],
  error: null,
  currentPage: 1,
  perPage: 8,
  inputValue: "",
  isLoading: false,
  bookInBasket: [],
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
      console.log(books);

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
      state.inputValue = action.payload;
    },
    changePage(state, action) {
      state.currentPage = action.payload;
    },
    addBook(state, action) {
      console.log(action.payload);

      state.bookInBasket.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.books = [];
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  },
});

export const { changePage, takeSearch, addBook } = booksSlice.actions;
export default booksSlice.reducer;
