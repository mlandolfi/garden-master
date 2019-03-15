import { combineReducers } from 'redux';

// imports for all the reducers
import GridsScreenReducer from './screens/GridsScreen/reducer';

export default combineReducers({
	gridsScreen: GridsScreenReducer,
})