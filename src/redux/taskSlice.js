import {createSlice} from '@reduxjs/toolkit'
import {fetchTasks} from "../firebase/firebasetasks.js";

const taskSlice = createSlice({
    name: 'task',
    initialState: {tasks: await fetchTasks()},
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state,index) => {
            state.tasks.splice(index,1);
        },
        updateTask: (state, index, action) => {
            state.tasks.at(index).push(action.payload);
        }
    }
});

export const {addTask, removeTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;