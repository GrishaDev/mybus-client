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
    try {
        const { payload } = data;
        const { data: token } = yield call(loginApi, {mail: payload});
        console.log(token);
        localStorage.setItem("auth", JSON.stringify({ token, mail: payload }));
        yield put(updateToken(token));
        yield call(toApp);
    }
    catch(err){
        console.log(err.status);
    }
}

function* getSchedulesSaga() {
    const state = yield select();
    const mail = state.myschedules.mail;
    console.log(mail);
    try {
        const schedules = yield call(getSchedulesApi, mail);
        console.log(schedules);
        // if(schedules.status === 401) {
        //     console.log('Unauthorized');
        //     yield call(toLogin);
        //     return;
        // }
        yield put(updateSchedules(schedules.data));
        yield put(showSuccessAlert(`Got Schedules`));

    }
    catch(err) {
        if(err.status === 401) {
            console.log('Unauthorized');
            yield call(toLogin);
            return;
        }
        else {
            yield put(showErrorAlert('Cant get schedules from server'));
        }
        console.log(err);
    }
}

function* deleteSchedulesSaga(data) {
    const { payload } = data;
    try { 
        const res = yield call(deleteScheduleApi, payload);
        // if(res.statusCode !== 200) {
        //     console.log(`Error ${res.status}`);
        //     yield put(showErrorAlert(`Failed deleting, status ${res.status}`));
        //     return;
        // }
        yield put(deleteSchedule(payload));
        yield put(showSuccessAlert(`Deleted`))
    }
    catch(err) {
        if(err.status === 401) {
            console.log('Unauthorized');
            yield call(toLogin);
            return;
        }
        else {
            console.log(`Error ${err.status}`);
            yield put(showErrorAlert(`Failed deleting, status ${err.status}`));
        }
        console.log(err);
    }
}

function* createSchedulesSaga(data) {
    const { payload } = data;
    try { 
        const res = yield call(createScheduleApi, payload);
        console.log("===================");
        console.log(res);
        console.log("===================");
        // if(res.status !== 200) {
        //     console.log(`Error ${res.status}`);
        //     yield put(showErrorAlert(`Failed creating, status ${res.status}`));
        //     yield put(setDialogStatus({success: false, error: res.message}));
        //     return;
        // }

        yield put(addSchedule(res.data));
        yield put(showSuccessAlert('Created'));
        yield put(setDialogStatus({success: true, error: null}));
    }
    catch(err) {
        if(err.status === 401) {
            console.log('Unauthorized');
            yield call(toLogin);
            return;
        }
        else {
            console.log(`Error ${err.status}`);
            yield put(showErrorAlert(`Failed creating, status ${err.status}`));
            yield put (setDialogStatus({success: false, error: err.data.message}));
        }
        console.log(err);
    }
}

function* updateSchedulesSaga(data) {
    // console.log('TFU');
    // console.log(id);
    // console.log(data);
    const { payload } = data;
    try {
        console.log(payload);
        const res = yield call(updateScheduleApi, payload.id, payload.data);
        // if(res.status !== 200) {
        //     console.log(`Error ${res.status}`);
        //     yield put(showErrorAlert(`Failed updating, status ${res.status}`));
        //     yield put(setDialogStatus({success: false, error: res.message}));
        //     return;
        // }

        yield put(updateSchedule(res.data));
        yield put(showSuccessAlert('Updated'));
        yield put (setDialogStatus({success: true, error: null}));
    }
    catch(err) {
        if(err.status === 401) {
            console.log('Unauthorized');
            yield call(toLogin);
            return;
        }
        else {
            console.log(`Error ${err.status}`);
            yield put(showErrorAlert(`Failed updating, status ${err.status}`));
            yield put (setDialogStatus({success: false, error: err.data.message}));
        }
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