// reducer for the MainGrid

import INITIAL_STATE from './InitialState'

import {
	RESIZE_MAIN_GRID_WIDTH,
	RESIZE_MAIN_GRID_HEIGHT,
	ADD_SHAPE,
} from '../actions/MainGridActions';


/*** case reducers ***/

function resizeWidth(prevState, width) {
	return Object.assign({},
		prevState,
		{ numColumns: width }
	);
};

function resizeHeight(prevState, height) {
	return Object.assign({},
		prevState,
		{ numRows: height }
	);
};

function addShape(prevState, shape, shapeID) {
	let shapes = Object.assign({},
		prevState.shapes,
	);
	shapes[shapeID] = shape;
	return Object.assign({},
		prevState,
		{ shapes },
	);
}

/*** mainGrid slice reducer ***/

export default function(state = INITIAL_STATE.mainGrid, action) {
	switch(action.type) {
		case RESIZE_MAIN_GRID_WIDTH:
			return resizeWidth(state, action.size);
			break;
		case RESIZE_MAIN_GRID_HEIGHT:
			return resizeHeight(state, action.size);
			break;
		case ADD_SHAPE:
			return addShape(state, action.shape, action.shapeID);
	}
	return state;
}
