import React from 'react';
import {Form, Input, Button, Card} from 'antd';
import 'antd/dist/antd.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class EventForm extends React.Component {
    // handlesubmit = () => ();

    render() {
        return (
            <div
      style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      }}>
      <Card
      style={{
          width: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      }}>
            <Form
                {...layout}

            >
                <Form.Item
                    className="title-form"
                    label="Title"
                    name="Title"
                    rules={[{
                        required: true,
                        message: 'Enter the Title for the timeline' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="link-form"
                    label="Link"
                    name="Link"
                    rules={[{
                        required: true,
                        message: 'Enter the link for this thinkgs' }]}
                >
                    <Input />
                </Form.Item>

                 <Form.Item {...tailLayout}>
                     <Button type="primary" htmlType="submit">
                         Submit
                     </Button>
                 </Form.Item>

            </Form>
          </Card>
          </div>
        )
    }

}

export default EventForm