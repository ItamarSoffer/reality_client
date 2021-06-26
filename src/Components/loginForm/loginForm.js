import React from 'react';
import {Form, Input, Button, Card} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import StoryLogo from "../Logo/StoryLogo";
const { Title } = Typography;


class LoginForm extends React.Component{

    onFinish = values => {
        // console.log('Received values of form: ', values);
        this.props.handlerLogin(values.username, values.password)
    };

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute', left: '50%', top: '30%',
                    transform: 'translate(-50%, -50%)'

                }}>
                <Card
                    style={{
                        width: 400,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        borderColor: '#ddd',
                        minHeight: 300

                    }}>
                    <div style={{textAlign:"center"}}>
                    <StoryLogo size={'60%'}/>
                    </div>
                    <br/>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}

                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Please input your Username!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your Password!'}]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '350px'}}>
                                Log in
                            </Button>

                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default LoginForm