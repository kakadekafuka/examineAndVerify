/**
 * Created by apple on 2017/2/21.
 */
import React, { Component } from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, Keyboard, LayoutAnimation} from 'react-native';
import { styles, colors, toast, L, hang} from '../../app';
import Button from 'react-native-button';
import TextField from '../../widgets/TextField';
import NetUitl from '../../libs/NetUtil';
import ProductList from '../inlet/ProductList';
var Spinner = require('react-native-spinkit');
import ProductListContainer from '../containers/ProductListContainer'
export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onSigned = props.onSigned;
        this._email = null;
        this._password = null;
        this.state = {
            isKeyboardOpened: false,
            visibleHeight: Dimensions.get('window').height,
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
            let newSize = Dimensions.get('window').height - e.endCoordinates.height;
            this.setState({
                isKeyboardOpened: true,
                visibleHeight: newSize
            });
        });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e => {
            this.setState({
                isKeyboardOpened: false,
                visibleHeight: Dimensions.get('window').height
            });
        });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillUpdate(props, state) {
        if (state.isKeyboardOpened !== this.state.isKeyboardOpened) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
    }

    async _login() {
        // if (this._email.value.length < 1) {
        //     this._email.focus();
        //     toast(L("请输入用户名称"), 70);
        //     return;
        // }
        // if (this._password.value.length < 1 ){
        //     this._password.focus();
        //     toast(L("请输入密码"), 70);
        //     return;
        // }

        let formData = new FormData();
        formData.append("userName", "xinxy");
        formData.append("userPass", "+1LXvT90JBc=");

        hang();
        let url = "http://www.zjscs.net:81/dcapi/api/app/cgf/login";
        NetUitl.postFrom(url, formData, (responseText) => {
            console.log("responseText====", responseText);
            alert(responseText);
            // toast(L(responseText.flag), 70);
            toast(L("欢迎您：", +responseText.mc), 70);
            this.onLoginSuccess();
        })

        hang(false);
    }

    //跳转到第二个页面去
    onLoginSuccess()
    {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                component: ProductListContainer
                // params: {
                // 	rowData
                // }
            })
        }
    }

    render() {
        return (
            <View style={style.window}>
                <View style={[styles.containerC, {height: this.state.visibleHeight}]}>
                    <View style={style.body}>
                        <View style={style.containerA}>
                                <Image style={style.third} source={require('../../../resources/images/weibo.png')}/>
                            <Text style={styles.text}>微博帐号登录</Text>
                        </View>
                        <TextField
                            ref={(c) => this._email = c}
                            placeholder="注册邮箱 / 登录名"
                            keyboardType="email-address"
                            //value="15237186505@139.com"
                            returnKeyType="next"
                            onSubmitEditing={()=>this._password.focus()}
                        />
                        <TextField
                            ref={(c) => this._password = c}
                            placeholder="密码"
                            secureTextEntry={true}
                            //  value="41022319890210"
                            returnKeyType="join"
                            onSubmitEditing={()=>this._login()}
                        />
                        <Button
                            style={styles.buttonText}
                            containerStyle={[styles.button, {marginTop: 20}]}
                            activeOpacity={0.5}
                            onPress={()=>this._login()}>
                            注册 / 登录
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({

    window: {
        flex: 1,
        backgroundColor: 'gray'
    },
    body: {
        flex: 1,
        height: 350,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: colors.bright2
    },
    containerA: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.bright2
    },
    third: {
        width: 64,
        height: 64,
        marginBottom: 10
    },
    link: {
        flex: 1,
        fontSize: 12,
        color: colors.accent
    }
});
