import React from 'react';
import {Form, Input, Button, Card, Modal, DatePicker, TimePicker, ConfigProvider, Select} from 'antd';
import 'antd/dist/antd.css';
import {UserOutlined} from '@ant-design/icons';
import IconsSelect from '../Icons/IconsSelect';

const { TextArea } = Input;




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
          New Event
        </Button>
          <ConfigProvider direction={"rtl"}>
        <Modal
          title="אירוע חדש"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
            okText="צור אירוע"
          cancelText="בטל"
          style={{
  borderRadius: '16px',
        }}
        >
            <Form>
                <Form.Item
                    className="title-form"
                    // label="כותרת"
                    name="Title"
                    rules={[{
                        required: true,
                        message: 'Event Title' }]}
                >
                    <Input direction="rtl" placeholder={"כותרת"} />
                </Form.Item>


                <Form.Item
                    className="link-form"
                    //label="תאריך"
                    name="date"
                    rules={[{
                        required: true,
                        message: 'Event date' }]}
                >
                    <DatePicker placeholder={"תאריך"} />
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="שעה"
                    name="time"
                    rules={[{
                        message: 'Event hour' }]}
                >
                    <TimePicker placeholder={"שעה"}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="קישור"
                    name="Link"
                    rules={[{
                        message: 'Event link' }]}
                >
                    <Input placeholder={"קישור"}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="תוכן"
                    name="text"
                    rules={[{
                        message: 'Event content' }]}
                >
                    <TextArea rows={3} placeholder={"תוכן האירוע"}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="שם משתמש"
                    name="user"
                    rules={[{
                        message: 'Event username' }]}
                >
                    <Input
                        placeholder="יוצר האירוע"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="אייקון"
                    name="icon"
                    rules={[{
                        message: 'Event Icon' }]}
                >
                <IconsSelect/>
                </Form.Item>
            </Form>
        </Modal>
          </ConfigProvider>
      </div>
    );
  }
}
export default CreateNewEvent