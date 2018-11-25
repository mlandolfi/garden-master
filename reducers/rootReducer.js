import { combineReducers } from 'redux';

// boxes is that 2D array of the boxes objects
// idk what will be in the boxes yet, ill figure it out later
export const INITIAL_STATE = {
	grid: {
		numRows: 0,
		numColumns: 0,
		boxes: []
	}
}

const gridReducer = (state = INITIAL_STATE, action) => {
	return state;
}

export default combineReducers({
	grid: gridReducer,
})