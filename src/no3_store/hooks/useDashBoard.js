import { useAllGetUser } from "./useUser";
import { useAllGetProduct } from "./useProduct";
import { useAllGetSales } from "./useSales";
import { useMemo } from "react";

export const useDashBoard = () => {
    const {data: salesList=[]} = useAllGetSales();
    const {data : productList=[]} = useAllGetProduct();
    const {data : userList = []} = useAllGetUser();

    //KPI만들기 => 핵심 성과 지표
    const kpi = useMemo(()=>{
        //총 매출액
        const totalSalesAmount = salesList.reduce((sum, item)=> (
            sum + Number(item.total_price)
        ),0)
        //판매건수
        const totalOrderCount = salesList.length; 
        //판매 총수량
        const totalQuantity  = salesList.reduce((sum, item)=>( 
            sum + Number(item.quantity)
        ),0)
        //고객수
        const customerCount = userList.length;
        //상품수
        const productCount = productList.length;

        return{ // OBJ로 리턴함, 키/밸류 합축 문법 사용
            totalSalesAmount, totalOrderCount, totalQuantity,customerCount, productCount
        }

    },[salesList, productList, userList])

    //고객 랭킹 구하기
    const userRanking = useMemo(()=>{
        const obj = {}
        salesList.forEach(item => {
            obj[item.user_id] = (obj[item.user_id] || 0 ) + 1
        });
        const userRankingListObj = Object.entries(obj).map(([userId, count])=>{
                const user = userList.find(user=>String(user.id)===String(userId))
                return{
                    name : user?.name || "unknown",
                    count
                }
            })
            .sort((a,b)=> b.count - a.count) // 내림차순정렬
            .slice(0,10) // 10명 랭킹 추출하기(?)
        return userRankingListObj;
    },[salesList, userList])

    // 상품 랭킹
    const productRanking = useMemo(()=>{
        const obj = {}
        salesList.forEach(item => {
            obj[item.product_id] = (obj[item.product_id] || 0) + 1
        });
        const productRankingObj = Object.entries(obj).map(([productId, quantity])=>{
                const product = productList.find(product=>String(product.id)===String(productId))
                return {
                    name: product?.product_name || "unknown",
                    quantity
                }
            })
            .sort((a, b) => b.quantity - a.quantity) //내림차순
            .slice(0, 10) // 랭킹 10명명
        return productRankingObj;
    }, [salesList, productList])

    return {
        kpi, 
        userRanking,
        productRanking
    }
}


