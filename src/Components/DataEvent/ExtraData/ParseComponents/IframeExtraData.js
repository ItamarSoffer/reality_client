import React from 'react';
import {Card} from "antd";
import { BarcodeOutlined } from '@ant-design/icons';
import Iframe from "react-iframe";


class IframeExtraData extends React.Component{

    render() {
        return (
            <Card
                size="small"
                headStyle={{backgroundColor: this.props.data.color}}
                title={this.props.data.type}
                extra={<div><BarcodeOutlined /></div>}
            >
                <Iframe url={this.props.data.content.src} {...this.props.data.content}/>
            </Card>
        )

    }
}

export default IframeExtraData;