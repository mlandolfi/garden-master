import { combineReducers } from 'redux';

// imports for all the reducers
import MainGridReducer from './containers/MainGrid/reducer';

export default combineReducers({
	mainGrid: MainGridReducer,
})