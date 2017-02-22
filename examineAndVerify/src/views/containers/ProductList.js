import React, { Component } from 'react';
var Button = require('react-native-button')
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    InteractionManager,
    RefreshControl,
    Platform,
    Alert,PixelRatio
} from 'react-native';
// or
import TouchableBounce from 'TouchableBounce';
import SwipeableListView from 'SwipeableListView';
import SwipeableQuickActions from 'SwipeableQuickActions';
import SwipeableQuickActionButton from 'SwipeableQuickActionButton';
import formatListViewDataSource from '../components/formatListViewDataSource.js'
import LoginButton from '../containers/LoginButton';
var UIExplorerPage = require('./UIExplorerPage');
import { request } from '../util/Http.js'
import reducer from '../reducers/rootReducer.js'
import LoadMoreFooter from '../components/LoadMoreFooter.js'
import ListSource from '../components/ListSource.js'
import ProductCell from '../components/ProductCell.js'
import NavigationBar from '../common/NavBarCommon.js'
import {
    getProductList,
    changeProductListRefreshing,
    changeProductListLoadingMore} from '../util/product.js'
import Storage from '../common/Storage.js'
// import ProductDetailContainer from '../containers/ProductDetailContainer.js'
// import ProductImageContainer from '../containers/ProductDetailContainer.js'
// import backIcon from '../../localSource/images/back.png'
// import SearchBar from './SearchBar.js'
const { width, height } = Dimensions.get('window')
let _pageNo = 1;
const _pageSize = 30;

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch({
            type: 'USER_ENTERED_WANT_HOME'        })
    }

// 在render方法成功调用并且真实的DOM已经被渲染之后，可以在componentDidMount内部通过this.getDOMNode(方法访问到它。
    componentDidMount() {
//网络访问数据
        this.props.dispatch(getProductList(_pageNo));
    }

    _goToDetail(rowData) {
        const { navigator } = this.props;
        // const imageUrl = `https:${rowData.imagePath}`;
        console.log("去商品详情页",rowData);
        Storage.removeValueForKey('lastestRecord');
        Storage.mergeArrayWithKeyValue('lastestRecord',{name: rowData.HJMC,id: rowData.RWID, productName: rowData.LCSLMC});
        if(navigator) {
            navigator.push({
                component: ProductImageContainer,
                params: {
                    rowData
                }
            })
        }
        // Alert.alert('下一页');
    }
    _onRefresh() {
        _pageNo=1;
        this.props.dispatch(getProductList(_pageNo));
    }

    _loadMoreData() {
        const { reducer, dispatch } = this.props;
        dispatch(changeProductListLoadingMore(true));
        _pageNo +=  1;
        // _pageNo = Number.parseInt(reducer.products.length / _pageSize) + 1;
        dispatch(getProductList(_pageNo));
    }

    _toEnd() {
        const { reducer } = this.props;
        console.log("加载更多？ ",reducer.isLoadingMore, reducer.products.length, reducer.totalProductCount,reducer.isRefreshing);
        //ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多         //
        if (reducer.isLoadingMore || reducer.products.length >= reducer.totalProductCount || reducer.isRefreshing) {
            return;       };
        if (reducer.isLoadingMore || reducer.products.length >= reducer.products.totalCount || reducer.isRefreshing) {
            return;
        };
        InteractionManager.runAfterInteractions(() => {
            console.log("触发加载更多 toEnd() --> ");
            this._loadMoreData();
        });
    }
    _renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
        return <View key={rowId + '_separator'} style={styles.hr}></View>     }
    _moreActions(rowData) {
        Alert.alert('更多==='+rowData.HJMC);
    }
    _addTask(rowData) {
        Alert.alert('任务==='+rowData.HJMC);
    }
    _renderActions(rowData, sectionId) {

        return (
            <SwipeableQuickActions style={styles.rowActions}>
                <SwipeableQuickActionButton imageSource={{}} text={"更多"}
                                            onPress={() => this._moreActions(rowData)}
                                            style={styles.rowAction} />
                <SwipeableQuickActionButton imageSource={{}} text={"+任务"}
                                            onPress={() => this._addTask(rowData)}
                                            style={styles.rowActionConstructive} />
            </SwipeableQuickActions>         );

    }

    _renderRow(rowData, sectionId, rowID) {

        return <ProductCell rowData={rowData} rowID={ rowID } goToDetail={ this._goToDetail.bind(this) }/>

    }


    onPressCallback2(rowData) {
        console.log("Button has been pressed!==AAAAAAA==",+rowData.RWID);
        Alert.alert('任务任务任务任务任务===='+rowData.HJMC);
    }

    render() {
        const { reducer } = this.props;
        let ds1 = SwipeableListView.getNewDataSource()

        this.listSource  = new ListSource(reducer.products);

        // let obj = formatListViewDataSource(reducer.products);
        // ds1 = ds1.cloneWithRowsAndSections(...obj);
        // ds1=ds1.cloneWithRowsAndSections({s1:this.listSource.datas}, ['s1'], null);
        ds1=ds1.cloneWithRowsAndSections({s1:reducer.products}, ['s1'], null);
        // console.log('ds1======',+this.listSource.datas );

        return (
            <View>
                <NavigationBar title={'首页'}/>
                <SwipeableListView               style={ styles.listViewContent }
                                                 dataSource={ds1 }
                    //bounceFirstRowOnMount
                                                 maxSwipeDistance={100}
                                                 pageSize={5}
                                                 initialListSize={10}
                    //侧滑事件
                                                 renderQuickActions={(rowData, sectionId, rowID) => this._renderActions(rowData, sectionId)}

                                                 renderRow={ (rowData,SectionId,rowID) =>  {


        return (
			<TouchableBounce    onPress={ () => this._goToDetail(rowData)}   >
				<View style={ styles.cellContiner }>
					<View style={ styles.textPart }>
						<Text style={ styles.productName }>{ rowData.HJMC }</Text>
						<Text style={ styles.companyName }>{ rowData.LCSLMC }</Text>
						<LoginButton name='登录' onPressCallback={() => this.onPressCallback2(rowData)}/>
					</View>
				</View>
			</TouchableBounce>
		)
                                             }}

                                                 onEndReached={ this._toEnd.bind(this) }
                                                 onEndReachedThreshold={10}
                                                 renderFooter={ this._renderFooter.bind(this) }
                                                 enableEmptySections={true}
                                                 refreshControl={

                           <RefreshControl
                   refreshing={ reducer.isRefreshing }
                   onRefresh={ this._onRefresh.bind(this) }
                   tintColor="gray"
                   colors={['#ff0000', '#00ff00', '#0000ff']}
                   progressBackgroundColor="gray"/>
                                             }/>
            </View>
        )
    }

    _renderFooter() {
        const { reducer } = this.props;
        //通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
        if (reducer.products.length < 1 || reducer.isRefreshing) {
            return null
        };

        if (reducer.products.length < reducer.totalProductCount) {
            //还有更多，默认显示‘正在加载更多...’
            return <LoadMoreFooter />       }else{
            // 加载全部
            return <LoadMoreFooter isLoadAll={true}/>
        }
    }
}

const px1 = 1 / PixelRatio.get();

const colors = {
    bright1: '#EFEFF4',
    bright2: '#DCDCE4',
    border: '#CCCCCC',
    accent: '#FDC02F',
    action: '#4CD964',
    dark1: '#000000',
    dark2: '#666666',
    TopColor: '#EEE9E9',
    groundColor:'#FFEFDB',

    changeTheme: function (theme) {
        console.log('todo theme');
    }
};
const styles = StyleSheet.create({
    listViewContent: {
        flex: 1,
        paddingBottom: height ,
        marginBottom: 0,
        backgroundColor: colors.groundColor,
        height: height - 49 - (Platform.OS === 'ios' ? 64 : 44),
    },
    searchBar: {
        backgroundColor: '#FDC02F',
        height: 40,
        flexDirection: 'row'   },
    rowAction: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'    },

    rowActions: {
        backgroundColor: colors.accent    },

    cellContiner: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: colors.TopColor ,
        borderBottomColor: colors.TopColor ,
        backgroundColor: colors.bright1,
        height: 100,
        alignItems: 'center',
    },
    hr: {
        height: px1,
        backgroundColor: colors.bright1    },
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
export default ProductList