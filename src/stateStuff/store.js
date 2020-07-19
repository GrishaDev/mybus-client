import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import mainReducer from './mainReducer';
import  { updateSnackbar } from './reducers/requestsReducer';
import  { setDialogStatus } from './reducers/formReducer';

import mainSaga from './mainSaga';
 
const sagaMiddleware = createSagaMiddleware({context: {snackbar: {}}});

const store = configureStore({
  reducer: mainReducer,
  middleware: [
    ...getDefaultMiddleware({serializableCheck: {ignoredActions: [updateSnackbar.type, setDialogStatus.type]}}), 
  sagaMiddleware]
});

sagaMiddleware.run(mainSaga);

export default store;