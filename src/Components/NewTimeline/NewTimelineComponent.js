import React from 'react';
import {Form, Input, Button, message} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import { withRouter } from "react-router-dom";

import {api_create_timeline} from '../../Structure/api';
import MenuIcons from "../Icons/MenuIcons";

const { TextArea } = Input;

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };


class CreateNewTimeline extends React.Component {

<<<<<<< HEAD
    constructor(props){
        super(props);
        this.state = {
            check: 1

        }
    }

=======
>>>>>>> da2bd71... add auto update after change (add or delete event)
    onFinish = values => {

        if (values.timeline_url.length <= 3){
            message.error("URL must be al least 3 chars!")
        }
        else {
<<<<<<< HEAD
    console.log('Received values from form: ', values);
     axios.post(api_create_timeline, {
             create_user: this.props.loggedUser,
=======
            const ApiCreateTimeline = backendAPI.concat("/create_timeline");
     axios.post(ApiCreateTimeline, {
            jwt_token: this.props.jwtToken,
             // create_user: this.props.loggedUser,
>>>>>>> e914983... completed JWT authentication
             description: values.description,
             name: values.title,
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
                    name="title"
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
                    name="description"
                    rules={[{
                        message: 'Timeline Description' }]}
                >
                    <TextArea rows={3} placeholder={"Description"} prefix={MenuIcons["form"]}/>
                </Form.Item>

<<<<<<< HEAD
                 <Form.Item {...tailLayout}>
                     <Button type="primary" htmlType="submit" >
=======
                 <Form.Item >
                     <Button type="primary" htmlType="submit"
                             style={{width:550,
                                 background:'#722ed1',
                                 borderColor:'#b37feb',
                             color:'#000'}} >
>>>>>>> da2bd71... add auto update after change (add or delete event)
                         Create
                     </Button>

                 </Form.Item>

            </Form>

          </div>
        )
    }

}

export default withRouter(CreateNewTimeline)