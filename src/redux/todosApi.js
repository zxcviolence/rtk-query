import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: build => ({
    getTodos: build.query({
      query: () => "todos",
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
