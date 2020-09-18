import React from 'react';
import {Typography} from "antd";
const {Title} = Typography;

class ParseError extends React.Component{

    render() {
        return (
            <Title
                level={2}
                type={'danger'}
            >
                Parse Error
            </Title>
        )

    }
}

export default ParseError;