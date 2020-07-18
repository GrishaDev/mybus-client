import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import mainReducer, { updateSnackbar, setDialogStatus } from './mainReducer';
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