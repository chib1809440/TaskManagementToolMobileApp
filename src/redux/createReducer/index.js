import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        desc: '',
        checkList: [],
        isDone: false
    },
    reducers: {
        addDesc(state, action) {
            state.desc = action.payload
        },
        addCheckList(state, action) {
            state.checkList = action.payload
        },
        addIsDone(state, action) {
            state.isDone = action.payload
        },
    }
});
const { actions, reducer } = todoSlice;
export const { addDesc, addCheckList, addIsDone } = actions;
export const { desc, checkList, isDone } = todoSlice.actions
export default reducer;