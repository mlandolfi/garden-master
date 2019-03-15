import Palette from './constants/palette';

/*** initial state the app would start with before anything is loaded ***/

/*	example plant
: {
	plantID: number,	// only unique to shape
	shapeID: number,	// unique at least to location
	name: string,
	type: string,
	color: string,
	datePlanted: string,
	sex: string,
	groupID: number,
}
*/

/*	example shape
{
	x: 0,
	y: 0,
	width: number,		// number of boxes
	height: number,		// number of boxes
	block: object,		// { visual: image/number, offset: number }
}
*/

const defaultPlant = {
	plantID: '2',
	shapeID: 'z40y3p4r0',
	name: 'blue dream',
	type: 'seedling',
	color: 'blue',
	datePlanted: 'Sat Mar 02 2019 15:37:13 GMT-0500 (EST)',
	sex: 'female',
	groupID: '',
}

const defaultShape = {
	x: 0,
	y: 0,
	id: 'z40y3p4r0',
	width: 4,		// number of boxes
	height: 4,		// number of boxes
	block: { visual: require('./assets/images/transparent3d.png'), offsetMultiplier: 0.3333333, color: 'skyblue' },		// { visual: image/number, offset: number }
}


const defaultLocation = {
	id: 0,
	numRows: 10,
	numColumns: 10,
	boxSize: 20,
	block: { color: Palette.primary.light, visual: null, offsetMultiplier: 0 },
	shapes: [defaultShape],
	plants: [defaultPlant],
}

export default {
	gridsScreen: {
		locations: [defaultLocation],
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
