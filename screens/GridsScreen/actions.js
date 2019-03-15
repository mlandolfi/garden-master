/*** actions for the MainGrid ***/

// action types
export const RESIZE_LOCATION_WIDTH = "RESIZE_LOCATION_WIDTH";
export const RESIZE_LOCATION_HEIGHT = "RESIZE_LOCATION_HEIGHT";
export const ADD_SHAPE_TO_LOCATION = "ADD_SHAPE_TO_LOCATION";
export const CHANGE_LOCATION_BLOCK = "CHANGE_LOCATION_BLOCK";
export const CHANGE_LOCATION_BOX_SIZE = "CHANGE_LOCATION_BOX_SIZE";

export const ADD_PLANTS_TO_LOCATION = "ADD_PLANTS_TO_LOCATION";

// action creators
export function resizeLocationWidth(locationID, width) {
	return { type: RESIZE_LOCATION_WIDTH, payload: { locationID, width } };
};

export function resizeLocationHeight(locationID, height) {
	return { type: RESIZE_LOCATION_HEIGHT, payload: { locationID, height } };
};

export function addShapeToLocation(locationID, shape) {
	return { type: ADD_SHAPE_TO_LOCATION, payload: { locationID, shape } };
}

export function changeLocationBlock(locationID, block) {
	return { type: CHANGE_MAIN_GRID_BLOCK, payload: { locationID, block } };
}

export function changeBoxSize(locationID, size) {
	return { type: CHANGE_LOCATION_BOX_SIZE, payload: { locationID, size } };
}


export function addPlantsToLocation(locationID, plants) {
	return { type: ADD_PLANTS_TO_LOCATION, payload: { locationID, plants } };
}