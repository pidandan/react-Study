/**
 * 首先创建store 数据存储中心
 */
import {createStore} from 'redux';
//我们已经存在了 数据仓库（reducer.js）那么此时我们也要引入这个数据仓库
//-----可理解为情景模拟中管理员查看图书的笔记本
//那么store就可以从数据仓库中进行查找了
import reducer from './reducer';
//createStore(reducer) 通过此方法就是将数据仓库中的内容暴露给store
//-----可理解为情景模拟中 将图书馆数据记录信息提供给了管理员
const store = createStore(reducer);
export default store;