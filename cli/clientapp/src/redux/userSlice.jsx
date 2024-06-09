import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[]
    },
    reducers:{
        getUser:(state, action) => {
            state.users = action.payload.map(user => {
                return {id: user._id, name:user.name, description:user.description}
            })
        },
        addTask: (state, action) => {
            state.users.push(action.payload)
        },
        updateTask: (state, action) => {
            const index = state.users.findIndex(x => x.id === action.payload.id)
            state.users[index] = {
                id: action.payload.id,
                name : action.payload.name,
                description : action.payload.description
            }
        },
        deleteTask: (state, action) => {
            const id = action.payload.id;
            state.users = state.users.filter(u => u.id !== id)
        }
    }
})

export const {getUser, addTask, updateTask, deleteTask} = userSlice.actions;
export default userSlice.reducer;