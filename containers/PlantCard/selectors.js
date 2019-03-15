

export function getPlant(state, plantKey) {
	for (locationKey in state.mainGrid.locations) {
		let location = state.mainGrid.locations[locationKey];
		for (let i=0; i<location.plants.length; i++) {
			if (`${location.plants[i].shapeID}#${location.plants[i].plantID}` == plantKey) {
				return location.plants[i];
			}
		}
	}
	return null;
}