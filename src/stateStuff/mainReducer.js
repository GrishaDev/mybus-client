import { combineReducers } from 'redux';
import formReducer from './reducers/formReducer';
import requestsReducer from './reducers/requestsReducer';
import schedulesReducer from './reducers/schedulesReducer';

export default combineReducers({
  form: formReducer,
  requests: requestsReducer,
  myschedules: schedulesReducer
});