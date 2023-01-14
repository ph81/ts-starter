import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MutateBook, BookState, BookResponse } from './types';

const BASEURL = 'https://book-api-black.vercel.app/api';

export const bookSlice = createApi({
  reducerPath: 'bookAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL, mode: 'cors' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    createBook: builder.mutation<BookResponse, BookState>({
      query(book) {
        return {
          url: '/books',
          method: 'POST',
          body: book,
        };
      },
      invalidatesTags: [{ type: 'Books' }],
    }),
    updateBook: builder.mutation<
      BookResponse,
      { bookId: string; book: MutateBook }
    >({
      query({ bookId, book }) {
        return {
          url: `/books/${bookId}`,
          method: 'PATCH',
          body: book,
        };
      },
      invalidatesTags: [{ type: 'Books' }],
    }),
    getBook: builder.query<BookResponse, string>({
      query(bookId) {
        console.log('builder:' + bookId);
        return {
          url: `/books/${bookId}`,
        };
      },
      providesTags: [{ type: 'Books' }],
    }),
    getAllBooks: builder.query<BookState[], { page: number }>({
      query({ page }) {
        return {
          url: `/books/?page=${page}`,
          //credentials: 'include',
        };
      },
      providesTags: [{ type: 'Books' }],
      keepUnusedDataFor: 5,
    }),
    deleteBook: builder.mutation<BookResponse, string>({
      query(bookId) {
        return {
          url: `/books/${bookId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Books' }],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBookQuery,
  useGetAllBooksQuery,
} = bookSlice;
