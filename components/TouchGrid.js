import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import GridBox from '../components/GridBox';

export default class TouchGrid extends React.PureComponent {

	render() {
		var { numRows, numColumns, boxEdgeLength, edit } = this.props;
		return (
			<View
              style={{
                margin: 'auto',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {Array.from(Array(numColumns*numRows).keys()).map((index) => {
              	var strIndex = index.toString();
                return (
                  <GridBox
                    selectable={edit}
                    key={strIndex}
                    keyName={strIndex}
                    edgeLength={boxEdgeLength}
                  />
                );
              })}
            </View>
		);
	}
}
TouchGrid.propTypes = {
	numRows: PropTypes.number.isRequired,
	numColumns: PropTypes.number.isRequired,
	boxEdgeLength: PropTypes.number.isRequired,
	edit: PropTypes.bool,
}