/**
 * 在实际的应用场景中 我们担心在组件之间进行相互传递值时由于属性不匹配导致错误 因此我们会在组件的传递进行时先进行传递校验
 * 它的实现是依赖于propTypes  在项目使用脚手架进行搭建时已经包含了prop-types的包
 *
 */
import React,{Component,Fragment} from 'react'
import PropTypes from 'prop-types';
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
TodoItem.protoTypes ={
    content:PropTypes.string,
    deleteItem:PropTypes.func,
    indexValue:PropTypes.number
}
export default TodoItem;