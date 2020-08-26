import React from 'react';
import {Form, Input, message, Modal, Typography, Tabs, Button, Drawer, Table, List} from "antd";
import {controlAboutsModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
// import {Divider} from "antd/es";
// import {backendAPI} from "../../Structure/api";
// import axios from 'axios';
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {AboutTableIcons} from "../Icons/Icons";

const {Title, Text} = Typography;
const { Search } = Input;
const { TabPane } = Tabs;



class AboutModal extends React.Component{

    columns = [
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            align: 'center',
            render: (icon) => AboutTableIcons[icon]
        },
        {
            title: 'Name',
            dataIndex: 'iconName',
            key: 'roleName',
            align: 'center',
            render: (text) => <Text strong >{text}</Text>


        }];


    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
    };

    closeModal = () => {
        this.props.hideAboutModalAction();
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        // console.log(e);
        this.props.hideAboutModalAction();
        this.setState({
            visible: false,
        });
    };

    render(){
        return(
            <Drawer
                title="About"
                visible={this.props.showAboutModal}
                onClose={this.handleCancel}
                placement="right"
                width={500}
                // title="About"
                // visible={this.props.showAboutModal}
                // onCancel={this.handleCancel}
                // style={{borderRadius: '16px',}}
                // footer={null}
            >
                <Tabs tabPosition={'top'} >
                    <TabPane tab="Story" key="1_about">
                        <Title level={4} style={{textAlign: 'center'}}>Story the best thing ever</Title>

                    </TabPane>

                    <TabPane tab="Icons" key="2_icons">
                        <Text> This are the available icons in Story.
                            You can use the names when uploading XLSX file.
                        </Text>
                        <List
                        size="small"
                        bordered
                        dataSource={Object.keys(AboutTableIcons)}
                        renderItem = {item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={AboutTableIcons[item]}
                                    title={item}
                                />
                            </List.Item>
                        )}/>

                    </TabPane>

                    <TabPane tab="Features" key="3_features">
                        <Title level={4} style={{textAlign: 'center'}}>all icons</Title>

                        <Title level={4} style={{textAlign: 'center'}}>Contact </Title>

                    </TabPane>

                    <TabPane tab="Contact" key="4_contact">

                        <Title level={4} style={{textAlign: 'center'}}>Contact </Title>

                    </TabPane>

                </Tabs>
            </Drawer>
        )
    }
}

const mapStateToProps = state => {
    return {
        showAboutModal: state.modalsReducer.showAboutModal,
        jwtToken: state.usersReducer.jwtToken,
        editMode: state.sitesReducer.editMode,


    }
};

const mapDispatchToProps = dispatch => {
    return{
        hideAboutModalAction: () => {dispatch(controlAboutsModalAction(false))},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},


    }

};

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);