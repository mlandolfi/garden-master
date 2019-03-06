
export const getLocations = (state) => state.mainGrid.locations;

export function getLocation(state, locationID) {
	state.mainGrid.locations.forEach((location) => {
		if (location.id == locationID)	return location;
	});
	return state.mainGrid.locations[0];
}

export function getPlants(state, locationID) {
	let plants = {};
	state.mainGrid.locations[locationID].plants.map((plant) => {
		if (Object.keys(plants).includes(plant.shapeID))
			plants[plant.shapeID].push(plant);
		else
			plants[plant.shapeID] = [plant];
	});
	return plants;
}