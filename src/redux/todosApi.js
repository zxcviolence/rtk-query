import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  // Мы работаем здесь с тудушками
  tagTypes: ["todos"],
  // Основной Url, по которому будут выполняться запросы. Дальше в endpoints расширяем
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: build => ({
    // Главный entrypoint на получение данных
    getTodos: build.query({
      query: (limit = "") => `todos?${limit && `_limit=${limit}`}`,
      // Обеспечиваем здесь некие тэги, для каждой тудушки добавляем его уникальный id, указываем тип, который указан в tagTypes,
      // указываем что все это будет списком этой категории
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "todos", id })),
              { type: "todos", id: "LIST" },
            ]
          : [{ type: "todos", id: "LIST" }],
    }),
    addTodo: build.mutation({
      query: body => ({
        url: "todos",
        method: "POST",
        body,
      }),
      // После того как выполним мутацию, указываем что у нас изменилось (для автоматического обновления данных)
      invalidatesTags: [{ type: "todos", id: "LIST" }],
    }),
    deleteTodo: build.mutation({
      query: id => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "todos", id: "LIST" }],
    }),
  }),
});

// хуки, создаются автоматически
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } =
  todosApi;
