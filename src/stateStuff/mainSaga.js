// import { all } from 'redux-saga/effects';
// import something from './something/somethingSaga';

// export default function* mainSaga() {
//   yield all([
//     something()
//   ]);
// }

 
import { put, call, takeEvery, all, select } from 'redux-saga/effects';
import { updateToken, updateSchedules, loginRequest, 
schedulesRequest, deleteScheduleRequest, createScheduleRequest, updateScheduleRequest,
addSchedule, updateSchedule, deleteSchedule } from './mainReducer';
import { loginApi, getSchedulesApi, createScheduleApi, updateScheduleApi, deleteScheduleApi } from 'api';
import history from 'utils/history';

export function* watchLoginSaga() {
    yield takeEvery(loginRequest.type, loginSaga)
}

export function* watchSchedulesSaga() {
    yield takeEvery(schedulesRequest.type, getSchedulesSaga)
}

export function* watchDeleteSaga() {
    yield takeEvery(deleteScheduleRequest.type, deleteSchedulesSaga)
}

export function* watchCreateSaga() {
    yield takeEvery(createScheduleRequest.type, createSchedulesSaga)
}

export function* watchUpdateSaga() {
    yield takeEvery(updateScheduleRequest.type, updateSchedulesSaga)
}


function* loginSaga(data) {
    const { payload } = data;
    const token = yield call(loginApi, payload);
    yield put(updateToken(token));
    yield call(forwardTo, '/');
}

function* getSchedulesSaga() {
    const { mail } = yield select();
    const schedules = yield call(getSchedulesApi, mail);
    yield put(updateSchedules(schedules));
}

function* deleteSchedulesSaga(data) {
    const { payload } = data;
    const res = yield call(deleteScheduleApi, payload);
    if(res)
        yield put(deleteSchedule(payload));
}

function* createSchedulesSaga(data) {
    const { payload } = data;
    const res = yield call(createScheduleApi, payload);
    yield put(addSchedule(res));
}

function* updateSchedulesSaga(data) {
    const { payload } = data;
    const res = yield call(updateScheduleApi, payload.id, payload.data);
    yield put(updateSchedule(res));
}


function forwardTo(location) {
    history.push(location);
}

export default function* rootSaga() {
    yield all([
        watchLoginSaga(),
        watchSchedulesSaga(),
        watchDeleteSaga(),
        watchCreateSaga(),
        watchUpdateSaga()
    ]);
}