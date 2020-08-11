import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dialogStatus: null,
};


const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setDialogStatus: (state, action) => {
            state.dialogStatus = action.payload;
        },
    }
})

export const {
    setDialogStatus,
} = form.actions;

export default form.reducer;
