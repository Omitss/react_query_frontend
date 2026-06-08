import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    productAllGetApi,
    productGetApi,
    productPostApi,
    productPutApi,
    productDeleteApi
} from "../apis/product.api"

export const useAllGetProduct = () => { // 데이터 리스트 형태로 다 받음
    return useQuery({
        queryKey: ["products"],
        queryFn: productAllGetApi
    })
}

export const useGetProduct = (id) => { // 데이터 하나 오브젝트로 받음
    return useQuery({
        queryKey: ["products", id],
        queryFn : ()=> productGetApi(id),
        enabled : !!id
    })
}

export const usePostRegisterProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productPostApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["products"],
                (old=[]) =>[
                    ...old, dataObj
                ]
            )
            // 캐쉬 제거, 데이터 다시 불러오기
           queryClient.invalidateQueries({
                queryKey : ["products"]
            })
        }
    })
}

export const usePutUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productPutApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["products"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item
                )
            );
            queryClient.invalidateQueries({
                queryKey : ["products", dataObj.id]
            })
            queryClient.invalidateQueries({
                queryKey : ["products"]
            })
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productDeleteApi,
        onSuccess: (id) =>{
            queryClient.setQueryData(
                ["products"],
                (old=[]) => old.filter(item=>
                    item.id !== id 
                )
            );
            queryClient.removeQueries(
                ["products", id],
            );
        }
    })
}