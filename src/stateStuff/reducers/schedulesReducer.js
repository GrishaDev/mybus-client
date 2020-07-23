import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mail: '',
    token: '',
    dialogStatus: null,
    schedules: [
        // {id: '3294a', mail: "blabla@bla.com", rule: {hour: 5, minute: 5}},
        // {id: '3294b', mail: "blabla@bla.com", rule: {hour: 5, minute: 5}}
    ]
};


const myschedules = createSlice({
    name: 'myschedules',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            state.token = action.payload;
        },
        updateSchedules: (state, action) => {
            const { payload } = action;
            state.schedules = payload;
        },
        addSchedule: (state, action) => {
            state.schedules.push(action.payload);
        },
        updateSchedule: (state, action) => {
            const { id } = action.payload;
            console.log(id);
            let index = state.schedules.findIndex((item)=> item.id === id);
            state.schedules[index] = action.payload;
        },
        deleteSchedule: (state, action) => {
            let index = state.schedules.findIndex((item)=> item.id === action.payload);
            state.schedules.splice(index,1);
        },
        loginRequest: (state, action) => {
            state.mail = action.payload;
        },
        setDialogStatus: (state, action) => {
            state.dialogStatus = action.payload;
        },
    }
})

export const {
    updateToken,
    updateSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    loginRequest,
    setDialogStatus,
} = myschedules.actions;

export default myschedules.reducer;