//useUser.js
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import{
    userAllGetApi,
    userLoginApi,
    userRegisterApi
}from "../apis/user.api"


export const useAllGetUser = () => { // 데이터 리스트 형태로 다 받음
    return useQuery({
        queryKey: ["user"],
        queryFn: userAllGetApi
    })
}


export const useLoginUser = () => { //*특이사항 : 로그인은 get방식으로 가져오나 특이 사항으로 pw등이 노출되면 안됨으로 mutatuion방식으로 가녀옴*
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : userLoginApi,
        onSuccess : (user)=> {
            localStorage.setItem("currentUser", JSON.stringify(user));
            // queryClient.setQueryData(
            //     ["user"],user
            // )
            
        }
        
    })
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn : userRegisterApi
    })
}

export const logout = () => {
    localStorage.removeItem("currentUser")
}

export const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser")
    return user && JSON.parse(user)//직렬화 문제 해결법
}