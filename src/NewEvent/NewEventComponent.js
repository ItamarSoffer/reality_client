import React from 'react';
import {Form, Input, Button, Modal, DatePicker, TimePicker, ConfigProvider, Select, message} from 'antd';
import 'antd/dist/antd.css';
import {UserOutlined} from '@ant-design/icons';
import axios from "axios"
import TimelineIcons from "../Icons/Icons";
import IconsSelect from '../Icons/IconsSelect';
import ColorPicker from '../ColorPicker/ColorPicker';



const { TextArea } = Input;
const { Option } = Select;


class CreateNewEvent extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
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

  onFinish = values => {
      const api_add_event = `http://localhost:5005/api/timeline/${this.props.url}/add`;
      console.log("FINITO", values);
      console.log("SENDS TO", api_add_event);
      console.log(values.date.format('YYYY-MM-DD'));
      axios.post(api_add_event, {
          "header": values.title,
          "text": values.text,
          "date": values.date.format('YYYY-MM-DD'),
          "hour":values.hour.format('hh:mm:ss'),
          "frame_color": this.state.color,
          "icon": this.state.icon,
          "link": values.link,
          "user": values.user
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
  }
  }).then(() => this.closeModal());
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.error('Missing fields!')
  };

  onColorChange = (newColor) => {
      this.setState({
          color: newColor
      })
  };

  onIconChange = (newIcon) => {
      this.setState({
          icon: newIcon
      })
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
          footer={[<Button type="default"  key="close" onClick={this.handleCancel}>
            Cancel
        </Button>,
        <Button type="primary" form="add_event_form" key="submit" htmlType="submit">
            Add Event
        </Button>


        ]}
          style={{
  borderRadius: '16px',
        }}
        >
            <Form
                id={"add_event_form"}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}

>
                {/*<Form.Item*/}
                {/*    className="title-form"*/}
                {/*    // label="כותרת"*/}
                {/*    name="url"*/}
                {/*    rules={[{*/}
                {/*        required: true,*/}
                {/*        message: 'Event Title' }]}*/}
                {/*>*/}
                {/*    <Input placeholder={"url"} />*/}
                {/*</Form.Item>*/}
                <Form.Item
                    className="title-form"
                    // label="כותרת"
                    name="title"
                    rules={[{
                        required: true,
                        message: 'Event Title' }]}
                >
                    <Input placeholder={"כותרת"} />
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
                    name="hour"
                >
                    <TimePicker placeholder={"שעה"}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="קישור"
                    name="link"
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
                        required: true,
                        message: 'Event content' }]}
                >
                    <TextArea rows={3} placeholder={"תוכן האירוע"}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="שם משתמש"
                    name="user"
                    rules={[{
                        required: true,
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
                    <IconsSelect handleIconChange={this.onIconChange}/>
                </Form.Item>
                 <Form.Item
                    className="link-form"
                    //label="צבע"
                    name="color"
                    rules={[{
                        message: 'Event Color' }]}
                >
                    <ColorPicker handleColorChange={this.onColorChange}/>
                </Form.Item>
            </Form>
        </Modal>
          </ConfigProvider>
      </div>
    );
  }
}


export default CreateNewEvent;
