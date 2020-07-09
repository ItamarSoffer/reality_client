import React from 'react';
import {Form, Input, Button, message, Card, Typography} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import { withRouter } from "react-router-dom";

import {backendAPI} from '../../Structure/api';
import MenuIcons from "../Icons/MenuIcons";
import {connect} from "react-redux";

const { TextArea } = Input;
const {Title} = Typography;

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };


class CreateNewTimeline extends React.Component {

    onFinish = values => {

        if (values.timeline_url.length <= 3){
            message.error("URL must be al least 3 chars!")
        }
        else {
            const ApiCreateTimeline = backendAPI.concat("/create_timeline");
     axios.post(ApiCreateTimeline, {
            jwt_token: this.props.jwtToken,
             // create_user: this.props.loggedUser,
             description: values.description,
             name: values.title,
             url: values.timeline_url
     })

         .then((response) => {
  // console.log("resp", response);
  if (response.status === 201){
      message.warning(response.data)
  }
  else if (response.status === 200){
  message.success(response.data, 1.5)
      .then(() => {
      return message.loading('redirecting', 1);
  })
      .then(() => {this.props.history.push({
            pathname: `/timeline/`.concat(values.timeline_url),
        });
      })

  }
}, (error) => {
  // console.log("error", error);
  message.error(error);
});
     // remove later.

 }
  };

    onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
    message.error('Missing fields!')
  };

    render() {

        return (
            <div
      style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute', left: '50%', top: '30%',
                  transform: 'translate(-50%, -50%)'
      }}>
                <Card
                  style={{
                      width: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      borderColor: '#ddd',
                      minHeight: 300

                  }}>
                    <Title level={1} style={{textAlign:"center"}}>New Story</Title>

            <Form
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}



            >

                <Form.Item
                    className="title-form"
                    name="title"
                    rules={[{
                        required: true,
                        message: 'Timeline Title' }]}
                >

                    <Input placeholder="Title"/>
                </Form.Item>

                <Form.Item
                    className="link-form"
                    name="timeline_url"
                    rules={[{
                        required: true,
                        message: 'Uniq URL' }]}
                >
                    <Input placeholder="URL" />
                </Form.Item>

                <Form.Item
                    //className="link-form"
                    name="description"
                    rules={[{
                        message: 'Timeline Description' }]}
                >
                    <TextArea rows={3} placeholder={"Description"} prefix={MenuIcons["form"]}/>
                </Form.Item>

                 <Form.Item >
                     <Button type="primary" htmlType="submit"
                             style={{width:550,
                                 background:'#722ed1',
                                 borderColor:'#b37feb',
                             }} >
                         Create
                     </Button>

                 </Form.Item>

            </Form>
                </Card>

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
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateNewTimeline));
