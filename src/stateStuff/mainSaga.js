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


function* loginSaga(data) {
    const { payload } = data;
    const token = yield call(loginApi, payload);
    yield put(updateToken(token));
    yield call(forwardTo, '/');
}

function* getSchedulesSaga() {
    const { mail } = yield select();
    try {
        const schedules = yield call(getSchedulesApi, mail);
        yield put(updateSchedules(schedules));
        yield put(showSuccessAlert(`Got Schedules`))
    }
    catch(err) {
        yield put(showErrorAlert('Cant get schedules from server'));
        console.log(err);
    }
}

function* deleteSchedulesSaga(data) {
    const { payload } = data;
    try { 
        yield call(deleteScheduleApi, payload);
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
        yield put(addSchedule(res));
        yield put(showSuccessAlert('Created'));
        yield put (setDialogStatus({success: true, error: null}));
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
        yield put(updateSchedule(res));
        yield put(showSuccessAlert('Updated'));
        yield put (setDialogStatus({success: true, error: null}));
    }
    catch(err) {
        yield put(showErrorAlert('Failed updating'));
        yield put (setDialogStatus({success: false, error: err}));
        console.log(err);
    }
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