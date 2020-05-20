import React from 'react';
import {Form, Input, Button, Card, Modal} from 'antd';
import 'antd/dist/antd.css';



class CreateNewEvent extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          New Timeline
        </Button>
        <Modal
          title="New Timeline"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
            okText="Create"
          cancelText="Cancel"
        >
            <Form>
                                <Form.Item
                    className="title-form"
                    label="Title"
                    name="Title"
                    rules={[{
                        required: true,
                        message: 'Timeline Title' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="link-form"
                    label="Link"
                    name="Link"
                    rules={[{
                        required: true,
                        message: 'Timeline Uniq URL' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
export default CreateNewEvent