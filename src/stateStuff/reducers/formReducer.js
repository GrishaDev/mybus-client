import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSchedule: {},
    dialogStatus: null,
    error: 'wtf?',
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
        setCurrentSchedule: (state, action) => {
            state.currentSchedule = action.payload;
        },
        setDialogStatus: (state, action) => {
            state.dialogStatus = action.payload;
        },
        setMail: (state, action) => {
            state.mail = action.payload;
            const { mail, bus, station, hour, minute } = state;
            state.error = validation(mail,bus,station,hour,minute);
        },
        setBus: (state, action) => {
            state.bus = action.payload;
            const { mail, bus, station, hour, minute } = state;
            state.error = validation(mail,bus,station,hour,minute);
        },
        setStation: (state, action) => {
            state.station = action.payload;
            const { mail, bus, station, hour, minute } = state;
            state.error = validation(mail,bus,station,hour,minute);
        },
        setTrigger: (state, action) => {
            state.scheduleTrigger = action.payload;
        },
        setTimes: (state, action) => {
            state.times = action.payload;
        },
        setHour: (state, action) => {
            state.hour = action.payload;
            const { mail, bus, station, hour, minute } = state;
            state.error = validation(mail,bus,station,hour,minute);
        },
        setMinute: (state, action) => {
            state.minute = action.payload;
            const { mail, bus, station, hour, minute } = state;
            state.error = validation(mail,bus,station,hour,minute);
        },
        setChecked: (state, action) => {
            state.checked = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const {
    setCurrentSchedule,
    setDialogStatus,
    setMail,
    setBus,
    setStation,
    setTrigger,
    setTimes,
    setHour,
    setMinute,
    setChecked,
    setError
} = form.actions;

export default form.reducer;


const validation = (mail, bus, station, hour, minute) => {
    if (!mail || !bus || !station || !hour || !minute) return true;
    else return false;
}