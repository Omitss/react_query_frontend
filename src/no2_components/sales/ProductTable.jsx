import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useAllGetProduct, useDeleteProduct, usePostRegisterProduct, usePutUpdateProduct } from '../../no3_store/hooks/useproduct'
import { AgGridReact } from 'ag-grid-react';
import ProductModal from './ProductModal';

const ProductTable = () => {

    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(null);

    const { data: productList = [], isLoading, error } = useAllGetProduct();

    const registerMutation = usePostRegisterProduct();
    const updateMutation = usePutUpdateProduct();
    const deleteMutation = useDeleteProduct();

    const handleRegister = () => {
        setNewProduct(null)
        setOpen(true)
    }

    const handleUpdate = async (item) => {
        setNewProduct(item)
        setOpen(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            await deleteMutation.mutateAsync(id)
        }
    }

    const columnDefs = useMemo(() => ([
        { field: "product_name", headerName: "상품명", flex: 1 },
        { field: "color", headerName: "색깔", flex: 1 },
        { field: "cost_price", headerName: "원가", flex: 1 },
        { field: "sale_price", headerName: "판매가", flex: 1 },
        { field: "category_code", headerName: "카테고리 코드", flex: 1 },
        {
            headerName: "상품 관리",
            cellRenderer: (params) => (
                <ButtonGroup>
                    <ActionButton
                        onClick={() => handleUpdate(params.data)}
                    >
                        수정
                    </ActionButton>

                    <DeleteButton
                        onClick={() => handleDelete(params.data.id)}
                    >
                        삭제
                    </DeleteButton>
                </ButtonGroup>
            ),
            flex: 1
        }
    ]), [handleDelete, handleUpdate])

    if (isLoading) return <h3>Loading...</h3>
    if (error) return <h3>{error?.message}</h3>

    return (
        <>
            <Container>

                <Header>
                    <Title>상품관리</Title>

                    <RegisterButton onClick={handleRegister}>
                        상품등록
                    </RegisterButton>
                </Header>

                <GridWrapper
                    className="ag-theme-alpine"
                >
                    <AgGridReact
                        theme="legacy"
                        rowData={productList}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationPageSize={25}
                        paginationPageSizeSelector={false}
                        animateRows={true}
                        getRowId={(params) => params.data.id.toString()}
                    />
                </GridWrapper>

            </Container>

            <ProductModal
                open={open}
                setOpen={setOpen}
                initialValues={newProduct}
                onSubmit={async (productObj) => {
                    if (newProduct) {
                        await updateMutation.mutateAsync({
                            ...productObj,
                            id: newProduct.id
                        })
                    } else {
                        await registerMutation.mutateAsync(productObj)
                    }
                }}
            />
        </>
    )
}

export default ProductTable

const Container = styled.div`
    padding: 24px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
`;

const Title = styled.h2`
    margin: 0;

    font-size: 24px;
    font-weight: 700;

    color: #1e293b;
`;

const RegisterButton = styled.button`
    border: none;
    border-radius: 10px;

    padding: 12px 20px;

    background: #2563eb;
    color: white;

    font-size: 14px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        background: #1d4ed8;
    }
`;

const GridWrapper = styled.div`
    width: 100%;
    height: 800px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

const ActionButton = styled.button`
    border: none;
    border-radius: 6px;

    padding: 6px 12px;

    background: #e2e8f0;

    cursor: pointer;
`;

const DeleteButton = styled.button`
    border: none;
    border-radius: 6px;

    padding: 6px 12px;

    background: #ef4444;
    color: white;

    cursor: pointer;
`;