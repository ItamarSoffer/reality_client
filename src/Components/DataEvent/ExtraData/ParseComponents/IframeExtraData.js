import React from 'react';
import {Card} from "antd";
import { BarcodeOutlined } from '@ant-design/icons';
import Iframe from "react-iframe";


class IframeExtraData extends React.Component{

    render() {
        let iFrameConsts = this.props.data.content;
        iFrameConsts['width'] = '100%';
        return (
            <Card
                size="small"
                headStyle={{backgroundColor: this.props.data.color}}
                title={this.props.data.type}
                extra={<div><BarcodeOutlined /></div>}
            >
                <div>
                <Iframe url={this.props.data.content.src} {...iFrameConsts}/>
                </div>
            </Card>
        )

    }
}

export default IframeExtraData;