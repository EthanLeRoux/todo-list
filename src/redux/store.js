import {configureStore} from "@reduxjs/toolkit";
import taskSlice from "./taskSlice.js";

export const store = configureStore({
    reducer: {
        tasker: taskSlice,
    }
})