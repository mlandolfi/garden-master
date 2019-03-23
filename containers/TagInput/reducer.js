import { combineReducers } from 'redux';

import INITIAL_STATE from '../../InitialState';

import { TAG_ADDED, TAG_REMOVED } from './actions';

function tagAdded(state, tag) {
	let updatedTags = [];
	let found = false;
	for (let i=0; i<state.length; i++) {
		if (state[i].tag == tag)	found = true;
		updatedTags.push({
			tag: state[i].tag,
			frequency: found ? state[i].frequency + 1 : state[i].frequency,
		});
	}
	if (!found)	updatedTags.push({ tag, frequency: 1 });
	return updatedTags;
}

function tagRemoved(state, tag) {
	updatedTags = [];
	for (let i=0; i<state.length; i++)
		updatedTags.push(state[i].tag == tag ? state[i].frequency - 1 : state[i].frequency);
	return updatedTags;
}

export default function tags(state=INITIAL_STATE.tags, action) {
	switch(action.type) {
		case "TAG_ADDED":
			return tagAdded(state, action.payload);
		case "TAG_REMOVED":
			return tagRemoved(state, action.payload);
		default:
			return state;
	}
}

