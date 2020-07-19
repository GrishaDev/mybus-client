import { createSlice } from '@reduxjs/toolkit';


const requests = createSlice({
    name: 'requests',
    initialState: {},
    reducers: {
        updateSnackbar() {},
        showErrorAlert() {},
        showSuccessAlert() {},
        schedulesRequest() {},
        deleteScheduleRequest() {},
        createScheduleRequest() {},
        updateScheduleRequest() {},
    }
})

export const {
    updateSnackbar,
    showErrorAlert,
    showSuccessAlert,
    schedulesRequest,
    deleteScheduleRequest,
    createScheduleRequest,
    updateScheduleRequest
} = requests.actions;

export default requests.reducer;