import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input , Button,List } from 'antd';
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

class TodoList extends Component{
    render(){
        return(
                <div>
                    <div>
                        <Input placeholder="Basic usage" style={{height:'40px',width:'300px',margin:'10px'}}/>
                        <Button type="primary">提交</Button>
                    </div> 
                    <div>
                        <List
                            style={{margin:'10px',width:'300px'}}
                            size="small"
                            header={<div>头部信息</div>}
                            footer={<div>底部信息</div>}
                            bordered
                            dataSource={data}
                            renderItem={item => (<List.Item>{item}</List.Item>)}/>
                    </div>
                </div>
        )
    }
}
export default TodoList