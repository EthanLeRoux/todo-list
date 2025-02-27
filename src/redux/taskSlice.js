import {createSlice} from '@reduxjs/toolkit'
import {fetchTasks, fetchTasksByUser} from "../firebase/firebasetasks.js";

const taskSlice = createSlice({
    name: 'task',
    initialState: {tasks: await fetchTasksByUser() || []},
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state,index) => {
            state.tasks.splice(index,1);
        },
        updateTask: (state, action) => {
            const{name, complete} = action.payload;
            const taskIndex = state.tasks.findIndex(task => task.name === name);
            if(taskIndex > -1){
                state.tasks[taskIndex] = {
                    name: name,
                    complete: complete
                }
            }
            else{
                alert("No valid task found to update.");
            }

        }
    }
});

export const {addTask, removeTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;