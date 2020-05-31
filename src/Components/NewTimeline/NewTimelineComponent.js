import React from 'react';
import {Form, Input, Button, message} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import { withRouter } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const api_create_timeline = "http://localhost:5005/api/create_timeline";


class CreateNewTimeline extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            check: 1

        }
    }

    onFinish = values => {

        if (values.timeline_url.length <= 3){
            message.error("URL must be al least 3 chars!")
        }
        else {
    console.log('Received values from form: ', values);
     axios.post(api_create_timeline, {
             create_user: this.props.loggedUser,
             description: values.timeline_description,
             name: values.timeline_title,
             url: values.timeline_url
     })

         .then((response) => {
  console.log("resp", response);
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
  console.log("error", error);
  message.error(error);
});
     // remove later.
    console.log(values.timeline_url);
    console.log(values.timeline_title);
    console.log(values.timeline_description);
    console.log(this.props.loggedUser);
 }
  };

    onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.error('Missing fields!')
  };

    render() {

        return (
            <div
      style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      }}>
            <Form
                {...layout}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}


            >

                <Form.Item
                    className="title-form"
                    label="Title"
                    name="timeline_title"
                    rules={[{
                        required: true,
                        message: 'Timeline Title' }]}
                >

                    <Input />
                </Form.Item>

                <Form.Item
                    className="link-form"
                    label="URL"
                    name="timeline_url"
                    rules={[{
                        required: true,
                        message: 'Uniq URL' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    //className="link-form"
                    label="Description"
                    name="timeline_description"
                    rules={[{
                        message: 'Timeline Description' }]}
                >
                    <Input />
                </Form.Item>

                 <Form.Item {...tailLayout}>
                     <Button type="primary" htmlType="submit" >
                         Create
                     </Button>

                 </Form.Item>

            </Form>

          </div>
        )
    }

}

export default withRouter(CreateNewTimeline)