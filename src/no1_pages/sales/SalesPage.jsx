import React from 'react'
import SalesTable from '../../no2_components/sales/SalesTable'
import { getCurrentUser } from '../../no3_store/hooks/useUser'
import AuthControl from '../../no2_components/layout/AuthControl';


const SalesPage = () => {
  const user = getCurrentUser();
  if(!user){
    return(
      <AuthControl
        message='로그인 후 상품정보를 조회 및 관리할 수 있습니다.'
      />
    )
  }
  return (
    <div>
      <SalesTable/>
    </div>
  )
}

export default SalesPage
