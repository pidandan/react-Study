import React,{Component,Fragment} from 'react'

class TodoItem extends Component{
    //组件运行时最先执行的方法 固定的写法
    constructor(props){
        super(props);
        //防止在itemClick的点击事件中this找不到指定的对象
        this.itemClick = this.itemClick.bind(this);
    }
    render(){
        return(
            <Fragment>
                <div onClick={this.itemClick}>{this.props.content}</div>
            </Fragment>
        )
    }
    //通过此方法向父组件进行传递值
    itemClick(){
        //调用父组件的方法 并将this.props.indexValue的值传递给了父组件中的方法
        this.props.deleteItem(this.props.indexValue);
    }
};
export default TodoItem;