import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import userDataReducer from './userDataReducer';
import globalMessageReducer from './globalMessageReducer';

const rootReducer = combineReducers({
	isLoggedIn: loginReducer,
	userData: userDataReducer,
	globalMessage: globalMessageReducer
});

export default rootReducer;
