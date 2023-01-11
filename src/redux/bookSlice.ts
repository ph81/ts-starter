import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
//import { v4 as uuidv4 } from 'uuid';
import { BookState } from './types';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(BASE_URL);
  console.log(response.data);
  return response.data;
});

type initialStateType = {
  bookList: BookState[];
  status: string;
  error: null;
};

//const bookList: BookState[] = [
/*
  {
    id: uuidv4(),
    title: '1984',
    author: 'George Orwell',
  },
  {
    id: uuidv4(),
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J. K. Rowling',
  },
  {
    id: uuidv4(),
    title: 'The Lord of the Rings',
    author: 'J.R.R Tolkien',
  },
  */
//];

const initialState: initialStateType = {
  bookList: [],
  status: 'idle',
  error: null,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<BookState>) => {
      state.bookList.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<BookState>) => {
      const {
        payload: { title, id, author },
      } = action;

      state.bookList = state.bookList.map((book) =>
        book.id === id ? { ...book, author, title } : book
      );
    },
    deleteBook: (state, action: PayloadAction<{ id: string }>) => {
      state.bookList = state.bookList.filter(
        (book) => book.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.bookList = [...action.payload];
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.status = 'failed';

      //state.error = action.error.message;
    });
  },
});

export const { addNewBook, updateBook, deleteBook } = bookSlice.actions;

export const selectBookList = (state: RootState) => state.book.bookList;

export default bookSlice.reducer;
