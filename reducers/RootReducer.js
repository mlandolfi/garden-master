import { combineReducers } from 'redux';

// imports for all the reducers
import MainGridReducer from './MainGridReducer';

export default combineReducers({
	mainGrid: MainGridReducer,
})