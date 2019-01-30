/*** initial state the app would start with before anything is loaded ***/

/*
examplePlant: {
	location: number,	block index it's inside
}
*/

/*
exampleShapeID: {
	width: number,		number of boxes
	height: number,		number of boxes
	block: object,		{ visual: image/number, offset: number }
	plants: []			see above ^^^
}
*/

export default {
	mainGrid: {
		numRows: 10,
		numColumns: 10,
		shapes: {},		// object of all shapes, key is unique id of shape
	},
}