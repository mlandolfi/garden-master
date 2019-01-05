

export default class Plant {

	constructor(x, y, type, picture) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.picture = picture;
		this.key = `${type}${x}${y}`
	}

}