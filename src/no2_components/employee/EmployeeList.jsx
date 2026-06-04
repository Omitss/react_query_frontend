// EmployeeList.jsx
import React, { useEffect } from 'react'
import styled from 'styled-components';
import {
  useAllGetEmployee,
} from "../../no3_store/hooks/useEmployee"

const EmployeeList = ({selectedId, setSelectedID}) => {
  
  const {data : empTable = [], isLoading, error} = useAllGetEmployee(); // 이게 restfulAPI에서는 다 만들어줬지만 query에서는 지들이 만들어줌
  
  if(isLoading) return <h3>Loading...</h3>
  if(error) return <h3>{error.message}</h3>

  return (
    <Container>
      {
        empTable?.map(item => (
          <EmployeeButton
            key={item.id}
            $active={selectedId === item.id}
            onClick={() => setSelectedID(item.id)}
          >
            {item.name}
          </EmployeeButton>
        ))
      }

    </Container>
  )
}

export default EmployeeList


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const EmployeeButton = styled.button`
  border: none;
  padding: 14px;
  border-radius: 10px;

  background: ${({$active}) =>
    $active ? "#3b82f6" : "#e2e8f0"};

  color: ${({$active}) =>
    $active ? "white" : "#1e293b"};

  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;

  &:hover{
    opacity: 0.85;
  }
`