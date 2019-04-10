import React,{Component,Fragment} from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
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

                    请输入内容<input
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
    //在此方法中发生AJAX请求获取刚进入页面时需要加载显示的数据
    //发送ajax请求后会有两个回调函数分别执行，请求成功调用.then方法，请求失败调用.catch方法
    componentDidMount(){
        axios.get('/api/todoList')
        .then((res)=>{
            //将获取到的数据进行页面的绑定
            this.setState(()=>{
                return{
                    //建议将res.data中的数据打散再进行赋值
                    list:[...res.data]
                }
            })

            alert('请求成功返回的数据为',res);
            
        
        })
        .catch((res) => {alert('请求失败error数据为',res)})
    }
    inputChange(e) {
        const  value = e.target.value;
        this.setState(() =>({
            inputValue : value
        }));
    }
    doListChange(){
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