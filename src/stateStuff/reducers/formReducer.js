import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSchedule: {},
    dialogStatus: null,
    error: true,
    mail: '',
    bus: '',
    station: '',
    scheduleTrigger: '',
    times: '',
    hour: '',
    minute: '',
    checked: false
};


const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setDialogStatus: (state, action) => {
            state.dialogStatus = action.payload;
        },
        setMail: (state, action) => {
            state.mail = action.payload;
            if(!state.mail) state.error = true;
            else state.error = false;
        },
        setBus: (state, action) => {
            state.bus = action.payload;
            if(!state.bus) state.error = true;
            else state.error = false;
        },
        setStation: (state, action) => {
            state.station = action.payload;
            if(!state.station) state.error = true;
            else state.error = false;
        },
        setTrigger: (state, action) => {
            state.scheduleTrigger = action.payload;
        },
        setTimes: (state, action) => {
            state.bus = action.payload;
        },
        setHour: (state, action) => {
            state.hour = action.payload;
            if(!state.hour) state.error = true;
            else state.error = false;
        },
        setMinute: (state, action) => {
            state.minute = action.payload;
            if(!state.minute) state.error = true;
            else state.error = false;
        },
        setChecked: (state, action) => {
            state.checked = action.payload;
        },
    }
})

export const {
    setDialogStatus,
    setMail,
    setBus,
    setStation,
    setTrigger,
    setTimes,
    setHour,
    setMinute,
    setChecked
} = form.actions;

export default form.reducer;