import React from 'react';
import {Form, Input, Button, Modal, DatePicker, TimePicker, ConfigProvider, message, Popover} from 'antd';
import 'antd/dist/antd.css';
import IconsSelect from '../Icons/IconsSelect';
import ColorPicker from '../ColorPicker/ColorPicker';
import MenuIcons from "../Icons/MenuIcons";
import {connect} from "react-redux";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {controlNewEventModalAction} from "../../Actions/modalsActions";
import TagsSelectByName from "../Tags/TagsSelectByName";
import {apiNewEvent, apiExtractTime} from "../../Actions/apiActions";
import {updateEventAction} from "../../Actions/eventsActions";
import {ClockCircleOutlined,} from '@ant-design/icons';
import moment from "./EditEvent";

const { TextArea } = Input;


class CreateNewEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: null,
            icon: null,
            tags: [],
            date: '',
            time: ''
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
        const hour = typeof values.hour !== "undefined" ? values.hour.format('HH:mm'): "";
        apiNewEvent(
            this.props.jwtToken,
            this.props.url,
            values.title,
            values.text,
            values.date.format('YYYY-MM-DD'),
            hour,
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

    onLinkChange = (val) => {
        this.setState({evtLink: val})
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
                        time: response.data.linkTime.time
                    })
                }
            });

        // console.log("EXTRACT FROM", this.state.evtLink);
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
                    style={{borderRadius: '16px',}}
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
                        <Form.Item
                            className="link-form"
                            //label="תאריך"
                            name="date"
                            rules={[{
                                required: true,
                                message: 'Event date' }]}
                        >
                            <DatePicker autoComplete='off' placeholder={"תאריך"}/>
                        </Form.Item>
                        <Form.Item
                            className="link-form"
                            //label="שעה"
                            name="hour"
                        >
                            <TimePicker autoComplete='off' placeholder={"שעה"} format={'HH:mm'}/>
                        </Form.Item>
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

const mapStateToProps = state => {
    return {
        showNewEventModal: state.modalsReducer.showNewEventModal,
        timelineRenderCount: state.sitesReducer.timelineRenderCount,
        jwtToken: state.usersReducer.jwtToken,

    }
};

const mapDispatchToProps = dispatch => {
    return{
        hideNewEventModal: () => {dispatch(controlNewEventModalAction(false))},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},
        updateEventAction: (event) => {dispatch(updateEventAction(event))},
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewEvent);