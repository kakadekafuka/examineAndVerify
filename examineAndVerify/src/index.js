/**
 * Created by apple on 2017/2/21.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import LoginActivity from './views/inlet/Login';  //登录页面
import configureStore from './views/store/store.js'
import {
    Navigator
} from 'react-native';
const store = configureStore();
 class APP extends React.Component {

     // SceneConfigs   可选的函数，用来配置场景动画和手势。会带有两个参数调用，
     // 一个是当前的路由，一个是当前的路由栈。然后它应当返回一个场景配置对象


     // configureScene   可以通过configureScene属性获取指定路由对象的配置信息，从而改变场景的动画或者手势

     // renderScene    必要参数。用来渲染指定路由的场景。调用的参数是路由和导航器。

    render() {
        return (
            <Provider store={ store }>
                <Navigator
                    initialRoute={{ component: LoginActivity }}
                    configureScene={(route) => {
				        return Navigator.SceneConfigs.FloatFromRight;
				    }}
                    renderScene={(route, navigator) => {
				    	let Component = route.component;
				        return <Component {...route.params} navigator={navigator} />
				        //  上面的route.params 是为了方便后续界面间传递参数用的
				    }} />
            </Provider>
        );
    }
}
export default APP;