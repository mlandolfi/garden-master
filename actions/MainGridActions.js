/*** actions for the MainGrid ***/

// action types
export const RESIZE_MAIN_GRID_WIDTH = "RESIZE_MAIN_GRID_WIDTH";
export const RESIZE_MAIN_GRID_HEIGHT = "RESIZE_MAIN_GRID_HEIGHT";


// action creators
export function resizeMainGrid(type, size) {
	return { type, size };
};
