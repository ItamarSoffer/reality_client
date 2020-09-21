import React from 'react';
import {Input, Typography, Form, Button, message, ConfigProvider, Divider} from "antd";
import MenuIcons from "../Icons/MenuIcons";
import {connect} from "react-redux";
import {apiContactSupport} from "../../Actions/apiActions";

const {Text, Title, Paragraph} = Typography;
const {TextArea} = Input;

function handleEnText (text){
    return <Paragraph style={{whiteSpace: "pre-line"}}>
        {text}
    </Paragraph>

}

class ContactTab extends React.Component{

    formRef = React.createRef();

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
    };

    onReset = () => {
        // console.log("RESET");
        this.formRef.current.resetFields();

    };
    onFinish = values => {
        const messageKey = 'support_message';
        message.loading({content: "Sending request...", key: messageKey});
        apiContactSupport(this.props.jwtToken, values.title, values.content)
            .then((response) => {
                    if (response.status !== 200) {
                        message.warning({content: response.data, key: messageKey})
                    } else if (response.status === 200) {
                        message.success({content: response.data, key: messageKey});
                        this.onReset()}
                }
            )
    };



    render() {
        return (
            <div>
                <Title level={4}>Contact us</Title>
                {handleEnText(`- Report an issue
                - Permissions for associates
                - New features you want
                - Anything
                `)}

                <Divider/>
                <ConfigProvider direction={"rtl"}>
                    <Form

                        id={"contact_form"}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        ref={this.formRef}
                    >
                        <Form.Item
                            className="title-form"
                            name="title"
                            rules={[{
                                required: true,
                                message: 'Title is required' }]}
                        >
                            <Input autoComplete='off' placeholder={"Title"} />
                        </Form.Item>

                        <Form.Item
                            className="link-form"
                            name="content"
                            rules={[{
                                required: true,
                                message: 'Content is required' }]}
                        >
                            <TextArea rows={4} placeholder={"Content"} prefix={MenuIcons["form"]}/>

                        </Form.Item>

                        <Button type="primary" form="contact_form" key="submit" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                </ConfigProvider>

            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,

    }
};

const mapDispatchToProps = dispatch => {
    return{
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ContactTab);