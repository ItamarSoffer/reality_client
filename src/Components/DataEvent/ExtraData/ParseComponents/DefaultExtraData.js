import React from 'react';
import {Card} from "antd";
import { PaperClipOutlined } from '@ant-design/icons';


class DefaultExtraData extends React.Component{

    render() {
            return (
                <Card
                    size="small"
                    headStyle={{backgroundColor: this.props.data.color}}
                    title={this.props.data.type}
                    extra={<div><PaperClipOutlined /></div>}
                >
                    THERE IS NOT ANY MATCHING COMPONENT EXISTS FOR THIS TYPE.
            </Card>
            )

    }
}

export default DefaultExtraData;