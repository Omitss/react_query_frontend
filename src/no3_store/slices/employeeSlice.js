// employeeSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { 
    employeeAllGetApi, 
    employeePostApi, 
    employeePutApi,
    employeeDeleteApi } 
from "../apis/employee.api";


export const employeeAllGetSlice = createAsyncThunk(
    "employeeAllGetSlice",
    async(_, thunkAPI)=> {
        try {
            return await employeeAllGetApi();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const employeePostSlice = createAsyncThunk(
    "employeePostSlice",
    async(dataObj, thunkAPI)=> {
        try {
            return await employeePostApi(dataObj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const employeePutSlice = createAsyncThunk(
    "employeePutSlice",
    async(dataObj, thunkAPI)=> {
           return await employeePutApi(dataObj);
         try {
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const employeeDeleteSlice = createAsyncThunk(
    "employeeDeleteSlice",
    async(id, thunkAPI)=> {
           return await employeeDeleteApi(id);
         try {
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


const initialEmp = {
  id: '', name: '', email: '', job: '', pay:''
}
const initialState = {
  empTable: [],
  emp: initialEmp,
  mode: '',
  selectedId: "",
  loading : false,
  error : null
}

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers:{
        select: (state, action) => {
            state.selectedId = action.payload
        },
        setEmp: (state, action) => {
            state.emp = action.payload
        },
        remove: (state) => {
            state.empTable = state.empTable.filter(emp=>(
                emp.id !== state.selectedId
            ))
        },
        setMode: (state,action) => {
            state.mode = action.payload
        }

    },
    extraReducers : (builder) => {
        builder
            .addCase(employeeAllGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(employeeAllGetSlice.fulfilled, (state, action) => {
                state.empTable = action.payload
                state.loading = false
            })
            .addCase(employeeAllGetSlice.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //위 3개 get방식

            .addCase(employeePostSlice.fulfilled, (state, action) => {
                state.empTable = [...state.empTable, action.payload]
                state.loading = false
            })
            //위 1개 post방식

             .addCase(employeePutSlice.fulfilled, (state, action) => {
                state.empTable = state.empTable.map(emp=>(
                                emp.id === state.selectedId ?
                                action.payload : emp)
                                )
                state.loading = false
            })
            //위 1개 put방식

             .addCase(employeeDeleteSlice.fulfilled, (state) => {
                state.empTable = state.empTable.filter(emp=>(emp.id !== state.selectedId))
                state.loading = false
            })
            //위 1개 delete방식

    }
})
export const {setMode, remove, register, update, select, setEmp } = employeeSlice.actions;
export default employeeSlice.reducer;