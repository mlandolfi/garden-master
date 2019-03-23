import { combineReducers } from 'redux';

import INITIAL_STATE from '../../InitialState'

import {
	RESIZE_LOCATION_WIDTH,
	RESIZE_LOCATION_HEIGHT,
	ADD_SHAPE_TO_LOCATION,
	CHANGE_LOCATION_BLOCK,
	CHANGE_LOCATION_BOX_SIZE,
	ADD_PLANTS_TO_LOCATION,
} from './actions';

import {
	ADD_TAG_TO_PLANT,
	REMOVE_TAG_FROM_PLANT,
} from '../../containers/PlantCard/actions';

/*** case reducers ***/
function width(locations, { locationID, width }) {
	return Object.assign({}, locations[locationID], { numColumns: width })
}

function height(locations, { locationID, height }) {
	return Object.assign({}, locations[locationID], { numRows: height })
}

function addShape(locations, { locationID, shape }) {
	return Object.assign({},
		locations[locationID],
		{ shapes: locations[locationID].shapes.concat(shape) })
}

function changeBlock(locations, { locationID, block }) {
	return Object.assign({}, locations[locationID], { block: block })
}

function changeBoxSize(locations, { locationID, boxSize }) {
	return Object.assign({}, locations[locationID], { boxSize: boxSize })
}

function addPlants(locations, { locationID, plants }) {
	return Object.assign({}, locations[locationID], { plants: locations[locationID].plants.concat(plants) })
}

function addTagToPlant(locations, { locationID, shapeID, plantID, tag }) {
	let toReturn = Object.assign({}, locations[locationID]);
	for (let i=0; i<toReturn.plants.length; i++) {
		if (toReturn.plants[i].shapeID == shapeID && toReturn.plants[i].plantID == plantID) {
			toReturn.plants[i].tags = toReturn.plants[i].tags.concat(tag);
			return toReturn;
		}
	}
	return toReturn;
}

function siftLocations(locations, payload, action) {
	let listToReturn = [];
	for (let i=0; i<locations.length; i++) {
		if (locations[i].id == payload.locationID)	listToReturn.push(action(locations, payload));
		 else	listToReturn.push(locations[i]);
	}
	return listToReturn;
}

function locations(state=INITIAL_STATE.gridsScreen.locations, action) {
	switch (action.type) {
		case RESIZE_LOCATION_WIDTH:
			return siftLocations(state, action.payload, width);
		case RESIZE_LOCATION_HEIGHT:
			return siftLocations(state, action.payload, height);
		case ADD_SHAPE_TO_LOCATION:
			return siftLocations(state, action.payload, addShape);
		case CHANGE_LOCATION_BLOCK:
			return siftLocations(state, action.payload, changeBlock);
		case CHANGE_LOCATION_BOX_SIZE:
			return siftLocations(state, action.payload, changeBoxSize);
		case ADD_PLANTS_TO_LOCATION:
			return siftLocations(state, action.payload, addPlants);
		case ADD_TAG_TO_PLANT:
			return siftLocations(state, action.payload, addTagToPlant);
		case REMOVE_TAG_FROM_PLANT:
			return siftLocations(state, action.payload, removeTagFromPlant);
		default:
			return state;
	}
}

export default combineReducers({
	locations,
});