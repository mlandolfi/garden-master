
export const getLocations = (state) => state.gridsScreen.locations;

export function getLocation(state, locationID) {
	for (location in state.gridsScreen.locations) {
		if (location.id == locationID)
			return location;
	}
	return state.gridsScreen.locations[0];
}

export function getPlants(state, locationID) {
	let plants = {};
	state.gridsScreen.locations[locationID].plants.map((plant) => {
		if (Object.keys(plants).includes(plant.shapeID))
			plants[plant.shapeID].push(plant);
		else
			plants[plant.shapeID] = [plant];
	});
	return plants;
}