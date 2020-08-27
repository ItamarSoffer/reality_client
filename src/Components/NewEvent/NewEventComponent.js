import React from 'react';
import {Form, Input, Button, Modal, DatePicker, TimePicker, ConfigProvider, message} from 'antd';
import 'antd/dist/antd.css';
import IconsSelect from '../Icons/IconsSelect';
import ColorPicker from '../ColorPicker/ColorPicker';
import MenuIcons from "../Icons/MenuIcons";
import {connect} from "react-redux";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {controlNewEventModalAction} from "../../Actions/modalsActions";
import TagsSelectByName from "../Tags/TagsSelectByName";
import {apiNewEvent} from "../../Actions/apiActions";

const { TextArea } = Input;


class CreateNewEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: null,
            icon: null,
            tags: []
        }
    }
    formRef = React.createRef();

    onReset = () => {
        // console.log("RESET");
        this.formRef.current.resetFields();
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
        console.log("FINITO", values);
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
                    message.success(response.data, 1.5)

                        .then(() => {
                            this.props.setReRenderTimeline(this.props.timelineRenderCount + 1);
                            this.setState({
                                color: null,
                                icon: null,
                                tags: []
                            })
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
                            <DatePicker autoComplete='off' placeholder={"תאריך"} />
                        </Form.Item>
                        <Form.Item
                            className="link-form"
                            //label="שעה"
                            name="hour"
                        >
                            <TimePicker autoComplete='off' placeholder={"שעה"}/>
                        </Form.Item>
                        <Form.Item
                            className="link-form"
                            //label="קישור"
                            name="link"
                            rules={[{
                                message: 'Event link' }]}
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
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewEvent);