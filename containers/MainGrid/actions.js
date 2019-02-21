/*** actions for the MainGrid ***/

// action types
export const RESIZE_MAIN_GRID_WIDTH = "RESIZE_MAIN_GRID_WIDTH";
export const RESIZE_MAIN_GRID_HEIGHT = "RESIZE_MAIN_GRID_HEIGHT";
export const ADD_SHAPE = "ADD_SHAPE";
export const CHANGE_MAIN_GRID_BLOCK = "CHANGE_MAIN_GRID_BLOCK";
export const CHANGE_BOX_SIZE = "CHANGE_BOX_SIZE";


// action creators
export function resizeMainGridWidth(size) {
	return { type: RESIZE_MAIN_GRID_WIDTH, payload: size };
};

export function resizeMainGridHeight(size) {
	return { type: RESIZE_MAIN_GRID_HEIGHT, payload: size };
};

export function addShape(shape) {
	return { type: ADD_SHAPE, payload: shape };
}

export function changeMainGridBlock(block) {
	return { type: CHANGE_MAIN_GRID_BLOCK, payload: block };
}

export function changeBoxSize(size) {
	return { type: CHANGE_BOX_SIZE, payload: size };
}