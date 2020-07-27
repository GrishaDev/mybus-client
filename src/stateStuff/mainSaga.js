// import { all } from 'redux-saga/effects';
// import something from './something/somethingSaga';

// export default function* mainSaga() {
//   yield all([
//     something()
//   ]);
// }

 
import { put, call, takeEvery, all, select, getContext } from 'redux-saga/effects';
// import { updateToken, updateSchedules, loginRequest, 
// schedulesRequest, deleteScheduleRequest, createScheduleRequest, updateScheduleRequest,
// addSchedule, updateSchedule, deleteSchedule, updateSnackbar, showErrorAlert, showSuccessAlert, setDialogStatus } from './mainReducer';

import { showErrorAlert, schedulesRequest, deleteScheduleRequest, createScheduleRequest, updateScheduleRequest,
showSuccessAlert, updateSnackbar } from './reducers/requestsReducer';
import { loginRequest, updateToken, updateSchedules, addSchedule, updateSchedule, deleteSchedule} from './reducers/schedulesReducer';
import { setDialogStatus } from './reducers/formReducer';

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
        const snackbar = yield getContext("snackbar");
        Object.assign(snackbar, action.payload);
    })
    yield takeEvery(showErrorAlert, function* (action) {
        const context = yield getContext("snackbar");
        context.enqueueSnackbar(action.payload, { variant: 'error',  autoHideDuration: 2000 });
    })
    yield takeEvery(showSuccessAlert, function* (action) {
        const context = yield getContext("snackbar");
        context.enqueueSnackbar(action.payload, { variant: 'success',  autoHideDuration: 2000 });
    })
}

function *init() {
    console.log('init');
    if(!localStorage.auth) return;
    const auth = JSON.parse(localStorage.auth);
    if(auth) {
        const { mail } = auth;
        // // TO DO::  yield validate token, if good continue otherwise do nothing
        // yield put(updateToken(token));
        yield put(loginRequest(mail))
        // yield call(toApp);
    }
}

function* loginSaga(data) {
    const { payload } = data;
    const token = yield call(loginApi, payload);
    console.log(token);
    localStorage.setItem("auth", JSON.stringify({ token, mail: payload }));
    yield put(updateToken(token));
    yield call(toApp);
}

function* getSchedulesSaga() {
    const { mail } = yield select();
    try {
        const schedules = yield call(getSchedulesApi, mail);
        if(schedules.status === 401) {
            console.log('Unauthorized');
            yield call(toLogin);
            return;
        }
        yield put(updateSchedules(schedules));
        yield put(showSuccessAlert(`Got Schedules`));

    }
    catch(err) {
        yield put(showErrorAlert('Cant get schedules from server'));
        console.log(err);
    }
}

function* deleteSchedulesSaga(data) {
    const { payload } = data;
    try { 
        const res = yield call(deleteScheduleApi, payload);
        if(res.status !== 200) {
            console.log(`Error ${res.status}`);
            yield put(showErrorAlert(`Failed deleting, status ${res.status}`));
            return;
        }
        yield put(deleteSchedule(payload));
        yield put(showSuccessAlert(`Deleted`))
    }
    catch(err) {
        yield put(showErrorAlert('Failed deleting'));
        console.log(err);
    }
}

function* createSchedulesSaga(data) {
    const { payload } = data;
    try { 
        const res = yield call(createScheduleApi, payload);
        if(res.status !== 200) {
            console.log(`Error ${res.status}`);
            yield put(showErrorAlert(`Failed creating, status ${res.status}`));
            yield put(setDialogStatus({success: false, error: res.message}));
            return;
        }

        yield put(addSchedule(res.data));
        yield put(showSuccessAlert('Created'));
        yield put(setDialogStatus({success: true, error: null}));
    }
    catch(err) {
        yield put(showErrorAlert('Failed creating'));
        yield put (setDialogStatus({success: false, error: err}));
        console.log(err);
    }
}

function* updateSchedulesSaga(data) {
    const { payload } = data;
    try {
        const res = yield call(updateScheduleApi, payload.id, payload.data);
        if(res.status !== 200) {
            console.log(`Error ${res.status}`);
            yield put(showErrorAlert(`Failed updating, status ${res.status}`));
            yield put(setDialogStatus({success: false, error: res.message}));
            return;
        }

        yield put(updateSchedule(res.data));
        yield put(showSuccessAlert('Updated'));
        yield put (setDialogStatus({success: true, error: null}));
    }
    catch(err) {
        yield put(showErrorAlert('Failed updating'));
        yield put (setDialogStatus({success: false, error: err}));
        console.log(err);
    }
}
    
    

function toApp() { 
    history.push('/');
}

function toLogin() { 
    history.push('/login');
}



export default function* rootSaga() {
    yield all([
        init(),
        watchLoginSaga(),
        watchSchedulesSaga(),
        watchDeleteSaga(),
        watchCreateSaga(),
        watchUpdateSaga(),
        notification()
    ]);
}