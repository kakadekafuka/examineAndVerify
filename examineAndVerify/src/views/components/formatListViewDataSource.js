/**
 * Created by apple on 2017/2/4.
 */
/**
 * @function formatListViewDataSource format data for ListView of react-native
 * @param {Array} data - data to be formatted
 * @return {Array}
 * @example
 *   let ds = formatListViewDataSource([1, 2, 3])
 *   xxx.cloneWithRowsAndSections(...ds)
 */
export default function formatListViewDataSource (data) {
    // for(var i=0;i<data.length;i++){
    //     // if (arr[i].key == 2){
    //     //     arr[i].props.style.fontSize = 40;
    //     //     arr[i].props.style.color = 'green';
    //     //     arr[i].props.children[0] = '改变了哦';
    //     // }
    //     console.log('aaaaaaaaaaaaaaaaaaaaaaa',+data[i]);
    // }
    //
    if (!Array.isArray(data)) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaa',+data);

        throw new Error('function only accept Array')
    }
    var dataBlob = {}
    var sectionIDs = ['r1']
    var rowIDs = [[]]
    data.forEach(function (element, index) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaa',+element);
        console.log('index=====',+index);
        dataBlob['r' + index] =element
        rowIDs[0].push('r' + index)
    })
    dataBlob['r1'] = ''
    return [
        dataBlob,
        sectionIDs,
        rowIDs
    ]
}