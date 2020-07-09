 
// import { put, call, takeEvery, all, select } from 'redux-saga/effects';
// import { updateToken, updateSchedules, loginRequest, schedulesRequest } from './somethingReducer';
// import { login, getSchedules } from 'api';
// import history from 'utils/history';

// export function* watchLoginRequest() {
//     yield takeEvery(loginRequest.type, performLogin)
// }

// export function* watchSchedulesRequest() {
//     yield takeEvery(schedulesRequest.type, getSchedulesRequest)
// }

// function* performLogin(data) {
//     const { payload } = data;
//     const token = yield call(login, payload);
//     yield put(updateToken(token));
//     yield call(forwardTo, '/');
// }

// function* getSchedulesRequest() {
//     const { mail } = yield select();
//     const schedules = yield call(getSchedules, mail);
//     yield put(updateSchedules(schedules));
// }

// function forwardTo(location) {
//     history.push(location);
// }

// export default function* rootSaga() {
//     yield all([
//         watchLoginRequest(),
//         watchSchedulesRequest()
//     ]);
// }