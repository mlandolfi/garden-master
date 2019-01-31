// reducer for the MainGrid

import INITIAL_STATE from './InitialState'

import {
	RESIZE_MAIN_GRID_WIDTH,
	RESIZE_MAIN_GRID_HEIGHT,
} from '../actions/MainGridActions';


/*** case reducers ***/

function resizeWidth(previousState, width) {
	return Object.assign({},
		previousState,
		{ numColumns: width }
	);
};

function resizeHeight(previousState, height) {
	return Object.assign({},
		previousState,
		{ numRows: height }
	);
};


/*** mainGrid slice reducer ***/

export default function(state = INITIAL_STATE.mainGrid, action) {
	switch(action.type) {
		case RESIZE_MAIN_GRID_WIDTH:
			return resizeWidth(state, action.size)
			break;
		case RESIZE_MAIN_GRID_HEIGHT:
			return resizeHeight(state, action.size)
			break;
	}
	return state;
}
