import React, { Component,Fragment } from 'react';
import './style.css'
//引入 CSSTransition
import {CSSTransition} from 'react-transition-group'
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      show:true
    }
    this.handleToggle = this.handleToggle.bind(this);
  }
  render() {
    return (
      //通过样式和事件的绑定来实现动画效果
      // <Fragment>
      //   <div className={this.state.show?'show':'hide'}>
      //     hello world
      //   </div>
      //   <button onClick={this.handleToggle}>toggle</button>
      // </Fragment>
      

      //使用react提供的动画组件CSSTranstion来实现动画效果 
      //in属性设置-->告诉CSSTransition 依靠那个值确定去实现动画效果
      <Fragment>
        <CSSTransition
          in={this.state.show}
          timeout={1000}
          classNames='fade'
          unmountOnExit
          onEntered = {(el) =>{el.style.color='red'}}
          appear={true}
        >
          <div> 你好世界！！！</div>
        </CSSTransition>
        <button onClick={this.handleToggle}>toggle</button>
      </Fragment>

    );
  }
  handleToggle(){
    this.setState({
      show:this.state.show?false:true
    }
    )
  }
}

export default App;
