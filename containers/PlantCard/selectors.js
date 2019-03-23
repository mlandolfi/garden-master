

export function getPlant(state, plantKey) {
	for (locationKey in state.gridsScreen.locations) {
		let location = state.gridsScreen.locations[locationKey];
		for (let i=0; i<location.plants.length; i++) {
			if (`${location.plants[i].shapeID}#${location.plants[i].plantID}` == plantKey) {
				return location.plants[i];
			}
		}
	}
	return null;
}

export function getShapeDimensions(state, shapeID) {
	for (locationKey in state.gridsScreen.locations) {
		let location = state.gridsScreen.locations[locationKey];
		for (let i=0; i<location.shapes.length; i++) {
			if (location.shapes[i].id == shapeID) {
				return {
					width: location.shapes[i].width,
					height: location.shapes[i].height,
				};
			}
		}
	}
	return { width: 0, height: 0 };
}