//employee.api.js
import axios from "axios";

export const productAllGetApi = async () => {
    try {
        const response = await axios.get("http://localhost:3001/products") // DB에서 가져오기 떄문에 employee가 아닌 DB에서 정의한 employees임
        return response.data
    } catch (error) {
        return error
    }
}

export const productGetApi = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/products/${id}`) 
        return response.data
    } catch (error) {
        return error
    }
}

export const productPostApi = async (dataObj) => {
    try {
        const response = await axios.post("http://localhost:3001/products", dataObj) 
        return response.data
    } catch (error) {
        return error
    }
}

export const productPutApi = async (dataObj) => {
    try {
        const response = await axios.put(`http://localhost:3001/products/${dataObj.id}`, dataObj) 
        return response.data
    } catch (error) {
        return error
    }
}

export const productDeleteApi = async (id) => {
    try {
        await axios.delete(`http://localhost:3001/products/${id}`) 
        return id
    } catch (error) {
        return error
    }
}