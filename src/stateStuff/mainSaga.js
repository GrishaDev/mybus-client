// import { all } from 'redux-saga/effects';
// import something from './something/somethingSaga';

// export default function* mainSaga() {
//   yield all([
//     something()
//   ]);
// }

 
import { put, call, takeEvery, take, all, select, getContext } from 'redux-saga/effects';
import { updateToken, updateSchedules, loginRequest, 
schedulesRequest, deleteScheduleRequest, createScheduleRequest, updateScheduleRequest,
addSchedule, updateSchedule, deleteSchedule, updateSnackbar, showNotification } from './mainReducer';
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

export function *notification() {
    yield takeEvery(updateSnackbar, function* (action) {
        console.log('...');
        console.log(action.payload);
        // yield setContext({snackbar: action.payload})
        const snackbar = yield getContext("snackbar");
        Object.assign(snackbar, action.payload);
    })
    yield takeEvery(showNotification, function* (action) {
        console.log(action.payload);
        // const { msg, } = action.payload;
        const context = yield getContext("snackbar");
        context.enqueueSnackbar(action.payload, { variant: 'error',  autoHideDuration: 2000 });
        // yield getContext("snackbar")?.enqueueSnackbar(action.payload)
    })
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
    if(res) {
        yield put(deleteSchedule(payload));
        yield put(showNotification('good'))
    }
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
        watchUpdateSaga(),
        notification()
    ]);
}