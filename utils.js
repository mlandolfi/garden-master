/***General Utility Functions to be used across the App***/


/**	rounds "num" to the closest multiple of "multiple"
*	@requires	None
*	@modifies	None
*	@returns	the multiple of "multiple" closest to num
*	Notes: can handle negative numbers
*/
export function roundToMultiple(num, multiple) {
	if (num < 0) {
		return Math.round(num + Math.abs(num % multiple));
	} else {
		return Math.round(num - Math.abs(num % multiple));
	}
}