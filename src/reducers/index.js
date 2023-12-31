import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
	isLoggedIn: loginReducer
});

export default rootReducer;
