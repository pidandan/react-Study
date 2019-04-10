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
     //生命周期中 Mounting(挂载阶段，即就是将组件挂载在html上时要去执行的函数，
    //在此阶段会去执行三个函数，componentWillMount,render,componentDidMount) 阶段要去执行的方法
    // componentWillMount函数
    componentWillMount(){
        console.log('Mounting阶段第一个执行的方法');
    }
    render(){
        console.log('Mounting阶段第二个执行的方法');
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
    componentDidMount(){
        console.log('Mounting阶段第三个执行的方法');
    }
//生命周期函数--》 组件被更新之前，他会被自动执行，此方法要求必须返回一个结果
//shouldComponentUpdate 其实就是询问你 组件需要被更新吗？如果return true 那么就是要去更新 那么就会执行render方法去更新组件
//如果return false 那么就是说不需要进行更新 那么redner方法不会被执行 意味着组件不会被刷新 
    shouldComponentUpdate(){
        console.log('updation阶段，当组件更新之前会执行此方法');  
        //return true 组件会更新  return false 组件不会被更新     
        return true;
    }
//组件执行完毕后要去执行的方法
    componentDidUpdate(){
        console.log('componentDidUpdate组件更新完毕，寡人要去睡觉');
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
    }
    handleItemDelete(index){
        this.setState((prevState) =>{
            const  listValue = [...prevState.list];
            listValue.splice(index,1);
            return {list:listValue}
        });
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