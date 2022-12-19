import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './createReducer/index';
export const store = configureStore({
    reducer: {
        todos: todoSlice
    },
})
