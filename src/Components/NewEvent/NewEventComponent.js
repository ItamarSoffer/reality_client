import React from 'react';
import {
    Form,
    Input,
    Button,
    Modal,
    DatePicker,
    TimePicker,
    ConfigProvider,
    message,
    Popover,
    Typography,
    Space} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import IconsSelect from '../Icons/IconsSelect';
import ColorPicker from '../ColorPicker/ColorPicker';
import MenuIcons from "../Icons/MenuIcons";
import {backendAPI} from "../../Structure/api";
<<<<<<< HEAD
import { Typography } from 'antd';
=======
import {connect} from "react-redux";
<<<<<<< HEAD
<<<<<<< HEAD
import {hideNewEventModalAction} from "../../Actions/siteActions";
>>>>>>> 79aa366... add permissions control
=======
import {hideNewEventModalAction, setReRenderTimelineAction} from "../../Actions/siteActions";
>>>>>>> da2bd71... add auto update after change (add or delete event)
=======
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {controlNewEventModalAction} from "../../Actions/modalsActions";
import TagsSelectByName from "../Tags/TagsSelectByName";
import {apiNewEvent} from "../../Actions/apiActions";
import {updateEventAction} from "../../Actions/eventsActions";
import {ClockCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';

const {Text} = Typography;

const { TextArea } = Input;


class CreateNewEvent extends React.Component {
<<<<<<< HEAD
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
<<<<<<< HEAD
=======
      this.props.hideNewEventModal();
>>>>>>> 79aa366... add permissions control
    this.setState({
      visible: false,
    });
  };

<<<<<<< HEAD
  handleOk = e => {
    console.log(e);
=======
  handleOk = () => {
    // console.log(e);
  this.props.hideNewEventModal();
>>>>>>> 79aa366... add permissions control
    this.setState({
      visible: false,
    });
  };

<<<<<<< HEAD
  handleCancel = e => {
    console.log(e);
=======
  handleCancel = () => {
    // console.log(e);
            this.props.hideNewEventModal();
>>>>>>> 79aa366... add permissions control
    this.setState({
      visible: false,
    });
  };

  onFinish = values => {
      const api_add_event = backendAPI.concat(`/timeline/${this.props.url}/add`);
      console.log("FINITO", values);
      console.log("SENDS TO", api_add_event);
      const hour = typeof values.hour !== "undefined" ? values.hour.format('hh:mm:ss'): "";
      axios.post(api_add_event, {
          "header": values.title,
          "text": values.text,
          "date": values.date.format('YYYY-MM-DD'),
          "hour":hour,
          "frame_color": this.state.color,
          "icon": this.state.icon,
          "link": values.link,
          // "user": this.props.loggedUser
})
         .then((response) => {
  console.log("resp", response);
  if (response.status === 201){
      message.warning(response.data)
  }
  else if (response.status === 200){
  message.success(response.data, 1.5)

      .then(() => {
          this.props.setReRenderTimeline(this.props.timelineRenderCount +    1);
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
        <Text onClick={this.showModal} >
            {MenuIcons['plus']}Add Event
        </Text>
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
                <Form.Item
                    className="title-form"
                    // label="כותרת"
                    name="title"
                    rules={[{
                        required: true,
                        message: 'Event Title' }]}
=======
    constructor(props){
        super(props);
        this.state = {
            color: null,
            icon: null,
            tags: [],
            date: '',
            time: '',
            isDatetimeParsed: false
        }
    }
    formRef = React.createRef();

    onReset = () => {
        // console.log("RESET");
        this.formRef.current.resetFields();
        this.setState({
            color: null,
            icon: null,
            tags: []
        })
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    closeModal = () => {
        this.props.hideNewEventModal();
        this.setState({
            visible: false,
        });

    };

    handleOk = () => {
        // console.log(e);
        this.props.hideNewEventModal();
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        // console.log(e);
        this.props.hideNewEventModal();
        this.setState({
            visible: false,
        });
    };

    onFinish = values => {
        // const api_add_event = backendAPI.concat(`/timeline/${this.props.url}/add`);
        // console.log("SENDS TO", api_add_event);
        //const hour = typeof values.hour !== "undefined" ? values.hour.format('HH:mm'): "";
        apiNewEvent(
            this.props.jwtToken,
            this.props.url,
            values.title,
            values.text,
            this.state.date, //values.date.format('YYYY-MM-DD'),
            this.state.time,
            this.state.color,
            this.state.icon,
            values.link,
            this.state.tags
        )
            .then((response) => {
                // console.log("resp", response);
                if (response.status === 201){
                    message.warning(response.data)
                }
                else if (response.status === 200){
                    message.success(response.data.message, 1.5)

                        .then(() => {
                            // this.props.setReRenderTimeline(this.props.timelineRenderCount + 1);
                            this.props.updateEventAction(response.data.eventData)

                            // form.resetFields();
                        })
                }
            }).then(() => {
            this.onCloseExtractedDatetime();
            this.onReset();
            this.closeModal()
        });
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

    onDateChange = (newDate) => {
        if (newDate === null){
            this.setState({date: ''});
        }
        else {
            this.setState({
                date: newDate.format('YYYY-MM-DD')
            });
        }
    };

    onCloseExtractedDatetime = () => {
        this.setState({
            date: '',
            time: '',
            isDatetimeParsed:false
        })

    };

    handleExtractTime = () => {
        if (typeof this.state.evtLink === "undefined" || this.state.evtLink.length === 0){
            message.error("Empty link");
            return
        }
        const messageKey = 'extract_message';
        message.loading({content: "Extracting Time...", key: messageKey});

        apiExtractTime(this.props.jwtToken, this.state.evtLink)
            .then((response) => {
                if (response.status === 201){
                    message.warning({content: response.data, key: messageKey})
                }
                else if (response.status === 200){
                    console.log(response.data.linkTime);
                    message.success({content: response.data.message,
                        key: messageKey,
                        duration: 2.5});
                    this.setState({
                        date: response.data.linkTime.date,
                        time: response.data.linkTime.time,
                        isDatetimeParsed:true
                    })
                }
            });
    };


    render() {
        return (

            <ConfigProvider direction={"rtl"}>
                <Modal
                    title="אירוע חדש"
                    visible={this.props.showNewEventModal}
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
>>>>>>> 8a372ee... add, edit and del event dont fetch all
                >
                    <Form

                        id={"add_event_form"}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        ref={this.formRef}
                    >
                        <Form.Item
                            className="title-form"
                            // label="כותרת"
                            name="title"
                            rules={[{
                                required: true,
                                message: 'Event Title' }]}
                        >
                            <Input autoComplete='off' placeholder={"כותרת"} />
                        </Form.Item>
                        {!this.state.isDatetimeParsed?
                            <div>
                                <Form.Item
                                    className="link-form"
                                    //label="תאריך"
                                    name="date"
                                    rules={[{
                                        required: true,
                                        message: 'Event date' }]}
                                >
                                    <DatePicker autoComplete='off' placeholder={"תאריך"} onChange={this.onDateChange}/>
                                </Form.Item>
                                <Form.Item
                                    className="link-form"
                                    //label="שעה"
                                    name="hour"
                                >
                                    <TimePicker autoComplete='off' placeholder={"שעה"} format={'HH:mm'} onChange={this.onTimeChange}/>
                                </Form.Item>
                            </div>:
                            <div style={{alignItems: 'center', justifyContent: 'center', textAlign:"center"}}>

                                <Space>
                                    <Text mark> Extracted Time: {this.state.date} {this.state.time} </Text>
                                    <Popover content={<Text style={{color: 'red'}}>Close</Text>}>
                                        <CloseCircleOutlined onClick={this.onCloseExtractedDatetime}/>
                                    </Popover>
                                </Space>


                                <br/>
                                <br/>
                            </div>
                        }
                        <Form.Item
                            className="link-form"
                            //label="קישור"
                            name="link"
                            rules={[{
                                message: 'Event link' }]}
                            onChange={(e) => this.onLinkChange(e.target.value)}

                        >
                            <Input
                                autoComplete='off'
                                placeholder={"קישור"}
                                prefix={MenuIcons["link"]}
                                // onChange={this.onLinkChange}

                                addonAfter={
                                    <Popover content={"Extract DateTime"}>
                                        <ClockCircleOutlined onClick={this.handleExtractTime}/>
                                    </Popover>}
                            />


                        </Form.Item>
                        <Form.Item
                            className="link-form"
                            //label="תוכן"
                            name="text"
                            rules={[{
                                // required: true,
                                message: 'Event content' }]}
                        >
                            <TextArea rows={3} placeholder={"תוכן האירוע"} prefix={MenuIcons["form"]}/>

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
                        <Form.Item
                            className="link-form"
                            //label="צבע"
                            name="tags"

                        >
                            <TagsSelectByName url={this.props.url} handleTagChange={this.onTagsChange}/>
                        </Form.Item>

                    </Form>
                </Modal>
            </ConfigProvider>
        );
    }
}

<<<<<<< HEAD
=======
const mapStateToProps = state => {
  return {
      showNewEventModal: state.sitesReducer.showNewEventModal,
      timelineRenderCount: state.sitesReducer.timelineRenderCount,

  }
};

const mapDispatchToProps = dispatch => {
    return{
<<<<<<< HEAD
        hideNewEventModal: () => {dispatch(hideNewEventModalAction())},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
=======
        hideNewEventModal: () => {dispatch(controlNewEventModalAction(false))},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},
        updateEventAction: (event) => {dispatch(updateEventAction(event))},
>>>>>>> 8a372ee... add, edit and del event dont fetch all
    }

};
>>>>>>> 79aa366... add permissions control

export default CreateNewEvent;
