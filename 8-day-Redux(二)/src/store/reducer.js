/**
 * state 指的是我们整个仓库的仓库域
 */
//默认仓库域中是个空对象
//当defaultState 中添加了两个属性 inputValue 和 list 说明会有这两个属性需要仓库域去管理 (情景模拟中 仓库中的实物或存在的东西)
const defaultState = {
    inputValue:'1',
    list:[1,2,3,4]
}
//reducer有个重要的原则是它可以接受state ,但是绝对不能修改state 这就是我们为什么要进行state的拷贝
export default (state = defaultState,action) =>{
    if(action.type === 'change_input_value'){
        //进行数据的更新
        //使用深copy对state进行copy
        const newState = JSON.parse(JSON.stringify(state));
        //获取到用户通知中的内容 然后将其给了newState来改变inputValue的值
        newState.inputValue = action.value;
        //最后 我们将newState进行返回即可 注意！！！再注意！！！ 这个环节呢是固定写法  固定写法
        //其实我们return 是将处理后的数据返回给store（情景模拟中的图书管理员，store拿到新数据后会将旧数据进行替换，那么完成了新老数据的转换工作）
        //虽然我们store中已经完成了数据的替换，但是组件中并没有刷新，那么我们需要在组件的应用处进行处理 
        //在组件的应用处执行 store.subscribe()方法--->这个方法的意思是组件中订阅了store，和广播一样去通知组件刷新数据重新渲染(见storeTodoList.js)
        return newState;
    }
    if(action.type === 'add_todo_item'){
        const newState = JSON.parse(JSON.stringify(state));
        //将newState中的inputValue  push到数组中 同时将inputValue的值置空
        newState.list.push(newState.inputValue);
        newState.inputValue ='';
        //由于之前在组件中已经订阅了 store那么这个更改数据会在页面更新
        return newState;
    }
    if(action.type === 'delete_todo_item'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.value,1);
        //由于之前在组件中已经订阅了 store那么这个更改数据会在页面更新
        return newState;
    }
    return state;
}