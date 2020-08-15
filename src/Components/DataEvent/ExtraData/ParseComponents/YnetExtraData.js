import React from 'react';
import {Card} from "antd";
import { UserOutlined } from '@ant-design/icons';


class YnetExtraData extends React.Component{

    render() {
            return (
                <Card
                    size="small"
                    headStyle={{backgroundColor: this.props.data.color}}
                    title={this.props.data.type}
                    extra={<UserOutlined/>}
                >
                    {this.props.data.content.author}
                    {this.props.data.content.date}
            </Card>
            )

    }
}

export default YnetExtraData;