import React, { Component } from 'react';
var Button = require('react-native-button')

import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableNativeFeedback,
    Image
} from 'react-native'
import TouchableBounce from 'TouchableBounce';
const { width, height } = Dimensions.get('window')
import LoginButton from '../containers/LoginButton';
class ProductCell extends Component {
	constructor(props) {
		super(props);
	}
    onPressCallback1 = () => {
        console.log("Button has been pressed!====");
    };

    onPressCallback2(rowData) {
        console.log("Button has been pressed!==AAAAAAA==",+this.props.rowData.HJMC);
    }

	render() {
		const {rowData, rowID, goToDetail} = this.props;
		return (
			<TouchableBounce onPress={ () => goToDetail(rowData) } >
				<View style={ styles.cellContiner }>
					{/*<Image style={ styles.image } source={{uri: `https:${rowData.imagePath}`}}/>*/}
					<View style={ styles.textPart }>
						{/*<Text style={ styles.productName }>({ rowID - 0 + 1 }).{ rowData.HJMC }</Text>*/}
						<Text style={ styles.productName }>{ rowData.HJMC }</Text>
						<Text style={ styles.companyName }>{ rowData.LCSLMC }</Text>
						<LoginButton name='登录' onPressCallback={this.onPressCallback2.bind(rowData)}/>
					</View>
				</View>
			</TouchableBounce>
		)
	}
}
const styles = StyleSheet.create({
	cellContiner: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		marginBottom: 5,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: '#EEE9E9',
		borderBottomColor: '#EEE9E9',
		backgroundColor: 'white',
		height: 100,
		alignItems: 'center',
	},
	image: {
		width: 90,
		height: 90,
		marginLeft: 8,
	},
	textPart: {
		marginLeft: 8,
		marginTop: 8,
		width: width ,
	},
	productName: {
		fontWeight: 'normal',
		fontSize: 16.0,
		color: 'black',
	},
	companyName: {
		marginTop: 8,
		fontSize: 14.0,
		color: 'gray',
	},

})

ProductCell.propTypes = {
	goToDetail: React.PropTypes.func.isRequired,

}

export default ProductCell