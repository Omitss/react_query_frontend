import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    employeeAllGetApi,
    employeeGetApi,
    employeePostApi,
    employeePutApi,
    employeeDeleteApi
} from "../apis/employee.api"

export const useAllGetEmployee = () => { // 데이터 리스트 형태로 다 받음
    return useQuery({
        queryKey: ["employees"],
        queryFn: employeeAllGetApi
    })
}

export const useGetEmployee = (id) => { // 데이터 하나 오브젝트로 받음
    return useQuery({
        queryKey: ["employees", id],
        queryFn : ()=> employeeGetApi(id),
        enabled : !!id
    })
}

export const usePostRegisterEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePostApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["employees"],
                (old=[]) =>[
                    ...old, dataObj
                ]
            )
            // 캐쉬 제거, 데이터 다시 불러오기
           queryClient.invalidateQueries({
                queryKey : ["employees"]
            })
        }
    })
}

export const usePutUpdateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePutApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["employees"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item
                )
            );
            queryClient.invalidateQueries({
                queryKey : ["employees", dataObj.id]
            })
            queryClient.invalidateQueries({
                queryKey : ["employees"]
            })
        }
    })
}

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeDeleteApi,
        onSuccess: (id) =>{
            queryClient.setQueryData(
                ["employees"],
                (old=[]) => old.filter(item=>
                    item.id !== id 
                )
            );
            queryClient.removeQueries(
                ["employees", id],
            );
        }
    })
}