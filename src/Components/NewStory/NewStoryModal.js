import React from 'react';
import {Button, Form, Input, message, Modal} from "antd";
import {controlNewStoryModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {apiCreateStory} from "../../Actions/apiActions";
import MenuIcons from "../Icons/MenuIcons";
const { TextArea } = Input;


class NewStoryModal extends React.Component{

    onFinish = values => {

        if (values.timeline_url.length <= 3){
            message.error("URL must be al least 3 chars!")
        }
        else {
            apiCreateStory(this.props.jwtToken, values.title, values.description, values.timeline_url)
                .then((response) => {
                    // console.log("resp", response);
                    if (response.status === 201){
                        message.warning(response.data)
                    }
                    else if (response.status === 200){
                        message.success(response.data, 1)
                            .then(() => {this.props.history.push({
                                pathname: `/story/`.concat(values.timeline_url),
                            });
                            })
                    }
                }, (error) => {
                    message.error(error);
                });
            // remove later.

        }
    };

    onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
        message.error('Missing fields!')
    };

    handleOk = () => {
        // console.log(e);
        this.props.hideNewStoryModal();
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        // console.log(e);
        this.props.hideNewStoryModal();
        this.setState({
            visible: false,
        });
    };


    render(){
        return(
            <Modal
                title="Create Story"
                visible={this.props.showNewStoryModal}
                style={{borderRadius: '16px',}}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button type="primary" form="create_new_story" key="submit" htmlType="submit"
                            style={{background:'#722ed1',borderColor:'#b37feb'}} >
                        Create!
                    </Button>,
                    <Button type="default"  key="close" onClick={this.handleCancel}>
                        Close
                    </Button>

                ]}
            >
                <Form
                    id={"create_new_story"}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >

                    <Form.Item
                        className="title-form"
                        name="title"
                        rules={[{
                            required: true,
                            message: 'Story Title' }]}
                    >

                        <Input placeholder="Title"/>
                    </Form.Item>

                    <Form.Item
                        className="link-form"
                        name="timeline_url"
                        rules={[{
                            required: true,
                            message: 'Uniq URL' }]}
                    >
                        <Input placeholder="URL" />
                    </Form.Item>

                    <Form.Item
                        //className="link-form"
                        name="description"
                        rules={[{
                            message: 'Story Description' }]}
                    >
                        <TextArea rows={3} placeholder={"Description"} prefix={MenuIcons["form"]}/>
                    </Form.Item>

                </Form>


            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showNewStoryModal: state.modalsReducer.showNewStoryModal,
        jwtToken: state.usersReducer.jwtToken,

    }
};

const mapDispatchToProps = dispatch => {
    return{
        hideNewStoryModal: () => {dispatch(controlNewStoryModalAction(false))},
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewStoryModal));
