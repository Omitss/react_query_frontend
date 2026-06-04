//employee.api.js
import axios from "axios";

export const employeeAllGetApi = async () => {
    try {
        const response = await axios.get("http://localhost:3001/employees") // DB에서 가져오기 떄문에 employee가 아닌 DB에서 정의한 employees임
        return response.data
    } catch (error) {
        return error
    }
}

export const employeeGetApi = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/employees/${id}`) 
        return response.data
    } catch (error) {
        return error
    }
}

export const employeePostApi = async (dataObj) => {
    try {
        const response = await axios.post("http://localhost:3001/employees", dataObj) 
        return response.data
    } catch (error) {
        return error
    }
}

export const employeePutApi = async (dataObj) => {
    try {
        const response = await axios.put(`http://localhost:3001/employees/${dataObj.id}`, dataObj) 
        return response.data
    } catch (error) {
        return error
    }
}

export const employeeDeleteApi = async (id) => {
    try {
        await axios.delete(`http://localhost:3001/employees/${id}`) 
        return id
    } catch (error) {
        return error
    }
}