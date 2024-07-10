import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ["todo"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (priority) => {
                const params = new URLSearchParams()

                if(priority){
                    params.append("priority", priority)
                }

                return {
                // url: `/tasks?priority=${priority}`,
                url: `/tasks`,
                method: 'GET',
                params: params
                }
            },
            providesTags: ["todo"]
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: '/task',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["todo"]
        }),
        updateTodo: builder.mutation({
            query: (options) => ({
                url: `/task/${options.id}`,
                method: 'PUT',
                body: options.data,
               
            }),
            invalidatesTags: ["todo"]
        }),
    })
});

// Export the generated hooks for the `getTodos` query endpoint
export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation } = baseApi;