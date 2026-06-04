import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { 
    todoAllGetApi,
    todoPostApi,
    todoPutApi,
    todoDeleteApi
 } from "../apis/todo.api"
import { data } from "react-router-dom";

export const todoAllGetSlice = createAsyncThunk(
    "todoAllGetSlice",
    async(_,thunkAPI)=>{
        try {
            return await todoAllGetApi();
        } catch (error) {
           return thunkAPI.rejectWithValue(error.message) 
        }
    }
)
export const todoPostSlice = createAsyncThunk(
    "todoPostSlice",
    async(dataObj,thunkAPI)=>{
        try {
            return await todoPostApi(dataObj);
        } catch (error) {
           return thunkAPI.rejectWithValue(error.message) 
        }
    }
)
export const todoPutSlice = createAsyncThunk(
    "todoPutSlice",
    async(dataObj,thunkAPI)=>{
        try {
            return await todoPutApi(dataObj);
        } catch (error) {
           return thunkAPI.rejectWithValue(error.message) 
        }
    }
)
export const todoDeleteSlice = createAsyncThunk(
    "todoDeleteSlice",
    async(id,thunkAPI)=>{
        try {
            await todoDeleteApi(id);
            return id;
        } catch (error) {
           return thunkAPI.rejectWithValue(error.message) 
        }
    }
)
export const todoToggleSlice = createAsyncThunk(
    "todoToggleSlice",
    async(dataObj, thunkAPI)=>{
        try {

            const newObj = {
                ...dataObj,
                checked: !dataObj.checked
            }

            return await todoPutApi(newObj);

        } catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const initialObj = {
    id: "",
    subject: "",
    checked: false
  }
const initialState = {
    todoList: [],
    todoObj: initialObj,
    loading : false,
    error : null
  }
  
  
const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        remove: (state, action) => {
            state.todoList = state.todoList.filter(todo=>
                (todo.id !== action.payload)
            )
        },
        update: (state, action) => {
            state.todoList = state.todoList.map(todo=>(
                todo.id === action.payload.id ? 
                    {...todo, subject: action.payload.value}
                    : todo
            ))

        },
        toggle: (state, action) => {
            state.todoList = state.todoList.map(todo=>(
                todo.id === action.payload ?
                    {...todo, checked: !todo.checked}
                    : todo
            ))
        },
        change: (state, action) => {
            state.todoObj = {
                ...state.todoObj,
                [action.payload.name] : action.payload.value
            }
        },
        register: (state) => {
            state.todoList = [
                ...state.todoList,
                {
                    ...state.todoObj,
                    id: state.todoList.length>0 ?
                        Math.max(...state.todoList.map(todo=>todo.id))+1
                        : 1
                }
            ]
            state.todoObj = initialObj
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(todoAllGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(todoAllGetSlice.fulfilled, (state, action) => {
                state.todoList  = action.payload
                state.loading = false
            })
            .addCase(todoAllGetSlice.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // 위 3개가 get 방식

            .addCase(todoPostSlice.fulfilled, (state, action) => {
                state.todoList.push(action.payload);
                state.loading = false
                state.todoObj = initialObj
            })
            // 위 post
            
            .addCase(todoPutSlice.fulfilled, (state, action) => {

                const newObj = state.todoList.find(todo=>todo.id === action.payload.id)
                state.todoList  =  state.todoList.map(todo=>(
                        todo.id === action.payload.id ?
                        action.payload : todo
                ))
            })
            // 위 put 

            .addCase(todoDeleteSlice.fulfilled, (state, action) => {
                state.todoList  =  state.todoList.filter(todo=>
                                    (todo.id !== action.payload)
                                    )
            })
            // 위 delete
            
            
            .addCase(todoToggleSlice.fulfilled, (state, action) => {
                state.todoList  = state.todoList.map(todo=>(
                    todo.id === action.payload.id ?
                    {...todo, checked: !todo.checked}
                    : todo
                    ))
            })
            // 위 toggle
    }
})

export const {remove, update, register, toggle, change} = todoSlice.actions;
export default todoSlice.reducer;
