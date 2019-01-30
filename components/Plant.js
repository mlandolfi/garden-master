

export default class Plant {

	// x and y should be in number of grid squares
	constructor(x, y, type, picture) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.picture = picture;
		this.key = `${type}${x}${y}`
	}

}