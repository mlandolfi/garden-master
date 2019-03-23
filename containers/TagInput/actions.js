/*** actions for the MainGrid ***/

// action types
export const TAG_ADDED = "TAG_ADDED";
export const TAG_REMOVED = "TAG_REMOVED";

// action creators
export function tagAdded(tag) {
	return { type: TAG_ADDED, payload: tag };
}

export function tagRemoved(tag) {
	return { type: TAG_REMOVED, payload: tag };
}