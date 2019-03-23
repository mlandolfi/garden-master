
export const ADD_TAG_TO_PLANT = "ADD_TAG_TO_PLANT";
export const REMOVE_TAG_FROM_PLANT = "REMOVE_TAG_FROM_PLANT";

export function addTagToPlant(tag, plantKey, locationID) {
	return {
		type: ADD_TAG_TO_PLANT,
		payload: { 
			tag,
			locationID,
			shapeID: plantKey.split('#')[0],
			plantID: plantKey.split('#')[1],
		},
	};
}

export function removeTagFromPlant(tag, locationID, shapeID, plantID) {
	return { type: REMOVE_TAG_FROM_PLANT, payload: { tag, locationID, shapeID, plantID } };
}