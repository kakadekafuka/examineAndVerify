/**
 * Created by apple on 2017/2/21.
 */
import I18n from 'react-native-i18n';//国际化
import moment from 'moment';
import {colors, styles, px1} from './views/styles';


import toast from './widgets/Toast';
import ActivityIndicator from './widgets/ActivityIndicator';

console.log('locale = ' + I18n.locale);
I18n.fallbacks = true;
I18n.missingTranslationPrefix = '';
I18n.missingBehaviour = 'guess';
// I18n.defaultLocale = I18n.locale;
I18n.translations = require('./langs');
// require('moment/locale/' + I18n.locale);
// moment.locale(I18n.locale);
require('moment/locale/zh-cn');
moment.locale('zh-cn');


function L(message, options) {
    return I18n.translate(message, options);
}

function hang(upOrType = true) {
    if(upOrType) {

        ActivityIndicator.show(typeof(upOrType) === 'string' ? upOrType : 'Wave');
    } else {
        ActivityIndicator.hide();
    }
}
//输出
export {   styles, colors, px1, L, toast, hang};
