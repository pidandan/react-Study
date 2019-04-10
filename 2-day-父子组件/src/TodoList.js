import React,{Component,Fragment} from 'react';
import TodoItem from './TodoItem';
class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue :'hello!!!',
            list:[]
        }
    }
    render(){
        return (
            <Fragment>
                <div>
                    <input
                        value={this.state.inputValue}
                        onChange={this.inputChange.bind(this)}
                    />
                    <button onClick={this.doListChange.bind(this)}>提交</button>
                </div>
                <ul>
                    {
                        this.todoItem()
                    }
                </ul>
            </Fragment>
            );
    }

    inputChange(e) {
        //新版本下 建议使用函数(异步的方法进行赋值 提高性能 )进行对象的赋值 ES6 return的一个简写
        //由于是一个异步的保存值的方法 那么异步执行时e.target.value 获取不到相应的值 那么需要先将值进行保存
        const  value = e.target.value;
        this.setState(() =>({
            inputValue : value
        }));
        //老版本时支持此方法进行赋值
        // this.setState({
        //     inputValue : e.target.value
        // });
    }
    doListChange(){
        //setState(prevState)方法中可以传递一个参数 prevState
        // prevState代表你修改数据之前的那次数据值 在目前方法中等价于this.state
        this.setState((prevState) => (
            {
                list: [...prevState.list,prevState.inputValue],
                inputValue: ''
            }
        ));
        // this.setState({
        //     list: [...this.state.list,this.state.inputValue],
        //     inputValue: ''
        // });
    }
    handleItemDelete(index){
        this.setState((prevState) =>{
            const  listValue = [...prevState.list];
            listValue.splice(index,1);
            return {list:listValue}
        });
        // const  listValue = [...this.state.list];
        // listValue.splice(index,1);
        // this.setState({
        //     list:listValue
        // })
    }
    /**
     *使用方法将页面中嵌入的js语法进行抽取包裹 提高页面的可读性
     **/
    todoItem(){
        return this.state.list.map((item,index) => {
            return (
                <div  key ={index}>
                    {/*content = {item} indexValue = {index} 是向组件TodoItem中传递的值
                        key ={index} 将index当作key值 但是这样的写法会有隐患 暂时使用index当作key去使用 key放在循环的最外围
                     deleteItem是向组件传递的方法 通过这个方法进行子组件向父组件传递值处理业务*/}
                    <TodoItem
                        content={item}
                        indexValue = {index}
                        deleteItem = {this.handleItemDelete.bind(this)}
                    />
                </div>
            )
        })
        }
}
export default TodoList;