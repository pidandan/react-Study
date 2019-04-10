import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input , Button,List } from 'antd';
//此时我们的数据要从store中来 因此要引入store
import store from './store/index'
class StoreTodoList extends Component{
    
    constructor(props){
        super(props);
        console.log('打印出Store中的值',store.getState());
        //将从store仓库中获取到的数据赋值给当前组件的state 当前组件的state就是当前组件的数据源 
        //可将this.state片面理解为当前组件的数据仓库，我们将总仓库的数据给了下发给下级仓库，那么下级仓库就会获取到总仓库中的内容
        this.state = store.getState();
        //对方法中this指向进行修改
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        /**
         * 向中心组件进行订阅 用来接受中心仓库中store的数据更新通知 
         * (情景模拟：用户发出借书请求，借书请求action传递到管理员store处，管理员store通过中心仓库reducer进行检阅数据
         * ，中心仓库检阅完毕之后将结果反馈给管理员store,管理员接收到结果之后，反馈给用户结果是xxxx即此处调用store.subscribe();方法
         * )
         *
         **/
            store.subscribe(this.handleStoreChange);
    }
    
 /**
  * 由于Input中输入的值是动态的 那么此时 input动态的值并没有将store中心仓库中的内容进行同步改变 value={this.state.inputValue}
  * 因此我们需要在input框中onChange事件发生时 不但将当前input中显示的值进行改变 同时要去更新中心仓库的内容 此时就需要action来进行处理
  */
    render(){
        return(
                <div>
                    <div>
                        <Input 
                        value={this.state.inputValue} 
                        placeholder="请输入内容" 
                        style={{height:'40px',width:'300px',margin:'10px'}}
                        onChange={this.handleInputChange}
                        />
                        <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
                    </div> 
                    <div>
                        <List
                            style={{margin:'10px',width:'300px'}}
                            size="small"
                            header={<div>头部信息</div>}
                            footer={<div>底部信息</div>}
                            bordered
                            dataSource={this.state.list}
                            renderItem={(item,index) => (<List.Item onClick={this.handleItemDelete.bind(this,index)}>{item}</List.Item>)}/>
                    </div>
                </div>
        )
    }
    /**
     * input中触发的onChange事件
     */
    handleInputChange(e){
        //我们现在向中心仓库发送通知 告诉其inputValue的值发生了改变需要进行更改
        //编写action ---->即情景模拟中用户表达的那句话 现在开始编写这句话
        /**
         * 这句话action 首先是一个对象 
         * 对象中type属性 用来表述你是要做什么事
         * 对象中value属性 用来表述传递的改变的内容
         * 这样我们就创建了这一句话
         * 
         * 这句话我们已经创建完毕 那么此时我们要将这句话传递给 中心仓库中的store呢
         * 那么执行store中提供的方法即可dispatch
         * 
         * 
         * 当中心仓库store 接收到用户发起的action 
         * 那么会自动执行方法将previousState(当前中心仓库的数据)、action(用户发起通知的数据)一并发给Reducers
         * 我们可以在store中心仓库文件夹下reducer.js中进行查看
         **/
        const action = {
            type:'change_input_value',
            value:e.target.value
        }
        store.dispatch(action);
        console.log(e.target.value);
    }
    /**
     * 接收中心仓库数据改变时执行的方法
     **/
    handleStoreChange(){
        /**
         * 这句话的意思是
         * 当我感知到store中数据发生了变化
         * 那么我从store中再重新取一次数据
         * 然后调用this.setState重新进行赋值
         **/
        this.setState( store.getState());
    }
    /**
     * 点击提交时执行的方法 当点击提交时我们希望将input中输入的值也更新到list中 但是lis我们是在中心仓库中放置的因此
     * 我们的处理流程也是
     * 第一创建action通知
     * 第二步将action发给Store
     * 
     */
    handleBtnClick(){
        const action ={
            type:'add_todo_item'
        };
        store.dispatch(action);
    }
    /**
     * 点击列表进行删除操作
     */
    handleItemDelete(index){
        //我们要删除中心仓库中的内容 那么首先先编写通知
        const action={
            type:'delete_todo_item',
            value:index
        }
        //将通知向store进行下发 告诉store你要做什么 
        //store接收到用户的通知，会将action全部转发给reducer去处理
        //reducer根据action 将通知处理后的结果反馈给store
        //store将结果拿到之后 会将store中的数据进行更新
        //更新完成之后 用户在组将中注册的 store.subscribe监听方法会发生响应 将组将中从store中获取到的内容进行更新 用户组件发生重新渲染  
        //上述部分就是一个完整的redux的工作流 即单项数据流
        store.dispatch(action);
    }
}
export default StoreTodoList