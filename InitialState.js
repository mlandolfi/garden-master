/*** initial state the app would start with before anything is loaded ***/

/*	example plant
: {
	location: number,	// block index it's inside
	id: number,
}
*/

/*	example shape
{
	x: 0,
	y: 0,
	width: number,		// number of boxes
	height: number,		// number of boxes
	block: object,		// { visual: image/number, offset: number }
	plants: []			// see above ^^^
}
*/

export default {
	mainGrid: {
		numRows: 10,
		numColumns: 10,
		block: { color: '#7cfc00', visual: null, offsetMultiplier: 0 },
		shapes: [],
		
	},
}


/*
defaultShape: {
	x: 0, y: 0,
	width: 1, height: 1,
	plants: [],
	block: { color: '#fff', visual: null, offsetMultiplier: 0 },
}
*/