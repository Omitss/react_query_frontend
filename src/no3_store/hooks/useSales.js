import { useQuery } from "@tanstack/react-query"
import { useAllGetUser } from "./useUser"
import { useAllGetProduct } from "./useProduct"
import { salesAllGetApi } from "../apis/sales.api"
import { useMemo } from "react"

export const useAllGetSales = () => {
    return useQuery({
        queryKey: ["sales"],
        queryFn: salesAllGetApi
    })
}

export const useGetSales = () =>{
    const {data: userList=[]} = useAllGetUser()
    const {data: productList=[]} = useAllGetProduct()
    const {data: salesList=[]} = useAllGetSales()

    const rowData = useMemo(()=>{
        const userObj = Object.fromEntries(
            userList.map(item=>[item.id, item])
        )
        const productObj = Object.fromEntries(
            productList.map(item=>[item.id, item])
        )
        const data = salesList.map(item =>({
                ...item,
                user_name: userObj[String(item.user_id)]?.name ?? "알수없음",
                product_name: productObj[String(item.product_id)]?.product_name ?? "알수없음"
            }   
        ))
        return data;
    },[userList, productList, salesList])
    return rowData;
}



//내가 만든 코드

// import { useQuery } from "@tanstack/react-query"
// import { useAllGetUser } from "./useUser"
// import { useAllGetProduct } from "./useProduct"
// import { salesAllGetApi } from "../apis/sales.api"

// export const useAllGetSales = () => {
//     return useQuery({
//         queryKey: ["sales"],
//         queryFn: salesAllGetApi
//     })
// }

// export const useGetSales =  () =>{
//     const {data: userList=[]} =  useAllGetUser()
//     const {data: productList=[]} =  useAllGetProduct()
//     const {data: salesList=[]} =  useAllGetSales()
    
//     const userObj = {}
//     Array.isArray(userList) &&
//     userList?.forEach(item => {
//         userObj[item.id] = item
//     })
    
//     const productObj = {}
//     Array.isArray(productList) &&
//     productList?.forEach(item => {
//         productObj[item.id] = item
//     })

//     const rowData = Array.isArray(salesList) &&
//     salesList.map(item =>({
//             ...item,
//             user_name: userObj[String(item.user_id)]?.name ?? "알수없음",
//             product_name: productObj[String(item.product_id)]?.product_name ?? "알수없음"
//         }   
//     ))
//     return rowData;
// }