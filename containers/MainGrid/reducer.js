import { combineReducers } from 'redux';

import INITIAL_STATE from '../../InitialState'

import {
	RESIZE_MAIN_GRID_WIDTH,
	RESIZE_MAIN_GRID_HEIGHT,
	ADD_SHAPE,
	CHANGE_MAIN_GRID_BLOCK
} from './actions';


/*** case reducers ***/
function numColumns(state=INITIAL_STATE.mainGrid.numColumns, action) {
	switch (action.type) {
		case RESIZE_MAIN_GRID_WIDTH:
			return action.payload;
		default:
			return state;
	}
};

function numRows(state=INITIAL_STATE.mainGrid.numRows, action) {
	switch (action.type) {
		case RESIZE_MAIN_GRID_HEIGHT:
			return action.payload;
		default:
			return state;
	}
};

// Note: slice() returns a shallow copy meaning it only
//		uses references to copy objects
function shapes(state=INITIAL_STATE.mainGrid.shapes, action) {
	switch (action.type) {
		case ADD_SHAPE:
			return state.slice().concat([action.payload]);
		default:
			return state;
	}
}

function block(state=INITIAL_STATE.mainGrid.block, action) {
	switch (action.type) {
		case CHANGE_MAIN_GRID_BLOCK:
			return action.payload;
		default:
			return state;
	}
}

export default combineReducers({
	numColumns,
	numRows,
	shapes,
	block,
});