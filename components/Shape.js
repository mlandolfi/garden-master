

export default class Shape {
	
	// (x, y) is the upper left corner when displayed on a grid
	// width and height are in number of grid squares
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.plants = [];
	}

	/**	returns true if the coords are in the shape
	*	@requires (x, y) and shape are on the same plane
	*		shape is a regular shape object
	*	@returns true if (x, y) are within the shape and false otherwise
	*/
	containsCoords = (x, y, boxSize) => {
		return (x > this.x && x < this.x + this.width
			&& y > this.y && y < this.y + this.height);
	}

	addPlant = (plant) => {
		this.plants.push(plant);
	}

	getPlantsByType = () => {
		let byType = [];
		for (let i=0; i<this.plants.length; i++) {
			let found = false;
			for (let j=0; j<byType.length; j++) {
				if (byType[j].label == this.plants[i].type) {
					let collection = byType[j].collection;
					collection.push(this.plants[i]);
					byType[j] = {
						key: byType[j].label,
						label: byType[j].label,
						count: byType[j].count + 1,
						collection,
					};
					found = true;
				}
			}
			if (!found) {
				byType.push({
					key: this.plants[i].type,
					label: this.plants[i].type,
					count: 1,
					collection: [this.plants[i]],
				});
			}
		}
		return byType;
	}

}