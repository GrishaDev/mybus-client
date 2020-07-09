import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import mainReducer from './mainReducer';
import mainSaga from './mainSaga';
 
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: mainReducer,
  middleware: [
    ...getDefaultMiddleware(), 
  sagaMiddleware]
});

sagaMiddleware.run(mainSaga);

export default store;