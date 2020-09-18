import React from 'react';
import {Card} from "antd";
import { UserOutlined } from '@ant-design/icons';


class YnetExtraData extends React.Component{

    render() {
        return (
            <Card
                size="small"
                headStyle={{backgroundColor: this.props.data.color}}
                title={this.props.data.content.title}
                extra={<div>{this.props.data.type} <UserOutlined/></div>}
            >
                {this.props.data.content.datetime}
                <br/>
                {this.props.data.content.text}
            </Card>
        )

    }
}

export default YnetExtraData;