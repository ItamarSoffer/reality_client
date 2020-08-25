import React from 'react';
import {Form, Input, Button, Modal, DatePicker, TimePicker, ConfigProvider, message} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import IconsSelect from '../Icons/IconsSelect';
import ColorPicker from '../ColorPicker/ColorPicker';
import MenuIcons from "../Icons/MenuIcons";
import {backendAPI} from "../../Structure/api";
import {connect} from "react-redux";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {hideEditEventModalAction} from "../../Actions/modalsActions";
import moment from 'moment';
import TagsSelectByName from "../Tags/TagsSelectByName";

const { TextArea } = Input;


class EditEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: '',
            icon: '',
            tags: this.props.eventData.tags.map(tag => (tag.tag_id)),
            time: moment(this.props.eventData.event_time, "YYYY-MM-DD h:mm:ss").format("HH:mm")
        }
    console.log(this.state.time);
    }



    showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
      this.props.hideEditEventModal();
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    // console.log(e);
  this.props.hideEditEventModal();
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    // console.log(e);
            this.props.hideEditEventModal();
    this.setState({
      visible: false,
    });
  };

  // fine
  onFinish = values => {
      const api_add_event = backendAPI.concat(`/timeline/${this.props.url}/add`);
      // console.log("FINITO", values);
      const date = typeof values.date !== "undefined" ? values.date.format('YYYY-MM-DD'): "";
      const color = this.state.color === '' ? this.props.eventData.frame_color: this.state.color ;
      const icon = this.state.icon === ''?  this.props.eventData.icon: this.state.icon ;
      const tags = this.state.tags === []?  this.props.eventData.tags: this.state.tags;

      const postData = {
          "jwt_token": this.props.jwtToken,
          "event_id": this.props.eventId,
          "header": values.title,
          "text": values.text,
          "date": date,
          "hour":this.state.time,
          "frame_color": color ,
          "icon": icon,
          "link": values.link,
          "tags": tags
};
      axios.post(api_add_event, postData)
         .then((response) => {
  // console.log("resp", response);
  if (response.status === 201){
      message.warning(response.data)
  }
  else if (response.status === 200){
  message.success(response.data, 1.5)
      .then(() => {
          this.props.setReRenderTimeline(this.props.timelineRenderCount + 1);
          // form.resetFields();
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

  onTagsChange = (newTags) => {
      this.setState({
          tags: newTags
      })
  };

  onTimeChange = (newTime) => {
      if (newTime === null){
          this.setState({time: ''});
      }
      else {
          this.setState({
              time: newTime.format('HH:mm')
          })
      }
};

  render() {
      // this is the most important!!!! each one must have a unique formId
      const formId = `update_event_form_${this.props.eventId}`;
    return (

          <ConfigProvider direction={"rtl"}>
        <Modal
            key={"m_".concat(this.props.eventId)}
          title={`Edit Event`}
          visible={this.props.showEditEventModal === this.props.eventId}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="צור אירוע"
          cancelText="בטל"
          footer={[<Button type="default"  key="close" onClick={this.handleCancel}>
            Cancel
        </Button>,
        <Button type="primary" form={formId} key="submit" htmlType="submit" onClick={this.onFinish}>
            Update
        </Button>


        ]}
          style={{
  borderRadius: '16px',
        }}
        >
            <Form

                id={formId}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
>
                <Form.Item
                    className="title-form"
                    // label="כותרת"
                    name="title"
                    rules={[{
                        required: true,
                        message: 'Event Title' }]}
                    initialValue={this.props.eventData.header}
                >
                    <Input id={"add_event_form"} autoComplete='off' placeholder={"כותרת"}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="תאריך"
                    name="date"
                    rules={[{
                        required: true,
                        message: 'Event date' }]}
                    initialValue={moment(moment(this.props.eventData.event_time, "YYYY-MM-DD").format('YYYY-MM-DD'), "YYYY-MM-DD")}
                >
                    <DatePicker autoComplete='off' placeholder={"תאריך"} />
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="שעה"
                    name="hour"
                    initialValue={
                        moment(
                            this.state.time, "HH:mm")
                    }
                >
                    <TimePicker autoComplete='off' placeholder={"שעה"} format='HH:mm' onChange={this.onTimeChange}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="קישור"
                    name="link"
                    rules={[{
                        message: 'Event link' }]}
                    initialValue={this.props.eventData.link}
                >
                    <Input autoComplete='off' placeholder={"קישור"}
                     prefix={MenuIcons["link"]}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="תוכן"
                    name="text"
                    rules={[{
                        // required: true,
                        message: 'Event content' }]}
                    initialValue={this.props.eventData.text}
                >
                    <TextArea rows={3} placeholder={"תוכן האירוע"} prefix={MenuIcons["form"]}
                              />
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="אייקון"
                    name="icon"
                    rules={[{
                        message: 'Event Icon' }]}
                >
                    <IconsSelect handleIconChange={this.onIconChange}
                    defaultValue={this.props.eventData.icon}/>
                </Form.Item>
                 <Form.Item
                    className="link-form"
                    //label="צבע"
                    name="color"
                    rules={[{
                        message: 'Event Color' }]}
                >
                    <ColorPicker handleColorChange={this.onColorChange} defaultValue={this.props.eventData.frame_color}/>
                </Form.Item>
                <Form.Item
                    className="link-form"
                    //label="צבע"
                    name="tags"

                >
                <TagsSelectByName url={this.props.url}
                            handleTagChange={this.onTagsChange}
                            defaultValue={this.props.eventData.tags.map(obj => (obj.tag_name))}
                />
                </Form.Item>

            </Form>
        </Modal>
          </ConfigProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
      showEditEventModal: state.modalsReducer.showEditEventModal,
      timelineRenderCount: state.sitesReducer.timelineRenderCount,
      jwtToken: state.usersReducer.jwtToken,

  }
};

const mapDispatchToProps = dispatch => {
    return{
        hideEditEventModal: () => {dispatch(hideEditEventModalAction())},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);