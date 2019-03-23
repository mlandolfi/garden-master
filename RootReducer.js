import { combineReducers } from 'redux';

// imports for all the reducers
import GridsScreenReducer from './screens/GridsScreen/reducer';
import TagsReducer from './containers/TagInput/reducer';

export default combineReducers({
	gridsScreen: GridsScreenReducer,
	tags: TagsReducer,
})