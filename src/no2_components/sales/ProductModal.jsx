import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd'

const ProductModal = ({ open, setOpen, initialValues, onSubmit }) => {

    const [form] = Form.useForm()

    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.setFieldsValue(initialValues)
            } else {
                form.resetFields();
            }
        }
    }, [open, initialValues, form])

    const onFinish = async (productObj) => {
        await onSubmit(productObj)
        setOpen(false)
        form.resetFields();
    }

    return (
        <Modal
            title={null}
            open={open}
            onCancel={() => {
                setOpen(false)
                form.resetFields();
            }}
            footer={null}
            width={700}
            centered
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                size='large'
            >

                <Form.Item
                    label="상품명"
                    name="product_name"
                    rules={[{ required: true, message: "상품명을 입력하세요." }]}
                >
                    <Input placeholder='예 : 악세사리' />
                </Form.Item>

                <Form.Item
                    label="색상"
                    name="color"
                    rules={[{ required: true, message: "색상을 선택하세요." }]}
                >
                    <Select
                        placeholder='색상선택'
                        options={[
                            { value: "Black", label: "Black" },
                            { value: "White", label: "White" },
                            { value: "Red", label: "Red" },
                            { value: "Blue", label: "Blue" }
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="단가"
                    name="cost_price"
                    rules={[{ required: true, message: "단가를 입력하세요." }]}
                >
                    <StyledInputNumber placeholder='예 : 40,000' />
                </Form.Item>

                <Form.Item
                    label="판매가"
                    name="sale_price"
                    rules={[{ required: true, message: "판매가를 입력하세요." }]}
                >
                    <StyledInputNumber placeholder='예 : 8,000' />
                </Form.Item>

                <Form.Item
                    label="카테고리 코드"
                    name="category_code"
                    rules={[{ required: true, message: "카테고리 코드를 선택하세요." }]}
                >
                    <Select
                        placeholder='카테고리 코드 선택'
                        options={[
                            { value: "E1", label: "E1" },
                            { value: "E2", label: "E2" },
                            { value: "E3", label: "E3" },
                            { value: "A1", label: "A1" },
                            { value: "A2", label: "A2" }
                        ]}
                    />
                </Form.Item>

                <Form.Item>
                    <SubmitButton
                        type="primary"
                        htmlType='submit'
                        block
                        size='large'
                    >
                        {initialValues ? "수정하기" : "등록하기"}
                    </SubmitButton>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ProductModal

const StyledInputNumber = styled(InputNumber)`
    width: 100%;
`;

const SubmitButton = styled(Button)`
    height: 48px !important;
    border-radius: 10px !important;
    font-weight: bold;
`;