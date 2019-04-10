import React,{Component,Fragment} from 'react'

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
                        this.state.list.map((item,index) => {
                            return <li>{item}</li>
                        })
                    }
                </ul>
            </Fragment>
            );
    }

    inputChange(e) {
        this.setState({
            inputValue : e.target.value
        });
    }
    doListChange(){
        console.log('出发了')
        this.setState({
            list: [...this.state.list,this.state.inputValue],
            inputValue: ''
        });
    }
}
export default TodoList;