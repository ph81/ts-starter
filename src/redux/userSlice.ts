import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MutateUser, UserState, UserResponse } from './types';

const BASEURL = 'https://node-api-users.vercel.app/api';

export const userSlice = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    mode: 'cors',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    createUser: builder.mutation<UserResponse, UserState>({
      query(user) {
        return {
          url: '/users',
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
    updateUser: builder.mutation<
      UserResponse,
      { userId: string; user: MutateUser }
    >({
      query({ userId, user }) {
        return {
          url: `/users/${userId}`,
          method: 'PATCH',
          body: user,
        };
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
    getUser: builder.query<UserResponse, string>({
      query(userId) {
        return {
          url: `/users/${userId}`,
        };
      },
      providesTags: [{ type: 'Users' }],
    }),
    getAllUsers: builder.query<UserState[], { page: number }>({
      query({ page }) {
        return {
          url: `/users/?page=${page}`,
        };
      },
      providesTags: [{ type: 'Users' }],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation<UserResponse, string>({
      query(userId) {
        return {
          url: `/users/${userId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useGetAllUsersQuery,
} = userSlice;
