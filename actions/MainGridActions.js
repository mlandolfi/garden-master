/*** actions for the MainGrid ***/

// action types
export const RESIZE_MAIN_GRID_WIDTH = "RESIZE_MAIN_GRID_WIDTH";
export const RESIZE_MAIN_GRID_HEIGHT = "RESIZE_MAIN_GRID_HEIGHT";

export const ADD_SHAPE = "ADD_SHAPE";


// action creators
export function resizeMainGridWidth(size) {
	return { type: RESIZE_MAIN_GRID_WIDTH, size };
};

export function resizeMainGridHeight(size) {
	return { type: RESIZE_MAIN_GRID_HEIGHT, size };
};

export function addShape(shape, shapeID) {
	return { type: ADD_SHAPE, shape, shapeID };
}
