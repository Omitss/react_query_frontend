//useTodo.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import{
    todoAllGetApi,
    todoGetApi,
    todoPostApi,
    todoPutApi,
    todoDeleteApi
}from "../apis/todo.api"

//crud + togggle

export const useAllGetTodo = () => {
    return useQuery({
            queryKey: ["todos"],
            queryFn: todoAllGetApi,
        })
}

export const useGetTodo = (id) => { 
    return useQuery({
        queryKey: ["todos", id],
        queryFn : ()=> todoGetApi(id),
        enabled : !!id
    })
}



export const usePostRegisterTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : todoPostApi,
        onSuccess : (dataObj)=>{
            queryClient.setQueryData(
                ["todos"],
                (old=[]) =>[
                    ...old, dataObj
                ]
            )
            queryClient.invalidateQueries({
                queryKey : ["todos"]
            })
        } 
    })
}

export const usePutUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : todoPutApi,
        onSuccess : (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item
                )
            );
            queryClient.invalidateQueries({
                queryKey : ["todos", dataObj.id]
            })
            queryClient.invalidateQueries({
                queryKey : ["todos"]
            })
        }
    })
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
        return useMutation({
            mutationFn: todoDeleteApi,
            onSuccess: (id) =>{
                queryClient.setQueryData(
                    ["todos"],
                    (old=[]) => old.filter(item=>
                        item.id !== id 
                    )
                );
                queryClient.removeQueries(
                    ["todos", id],
                );
            }
        })
}
