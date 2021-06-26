import React from 'react';
import {Button, message, Modal, Typography} from "antd";
import {controlDeleteTimelineModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
import DownloadExcel from "../Export/ToExcel";
import {withRouter} from "react-router";
import {apiDeleteStory} from "../../Actions/apiActions";
const {Text, Title} = Typography;

class DeleteStoryModal extends React.Component{
    handleTimelineDelete = () => {
        message.info("Get a backup on us :)", 3);
        DownloadExcel(this.props.url, this.props.jwtToken);
        apiDeleteStory(this.props.jwtToken, this.props.timelineId )
            .then((response) => {
                if (response.status === 201) {
                    message.warning(response.data)
                } else if (response.status === 200) {
                    this.props.hideDeleteTimelineModal();
                    message.success(response.data, 3)
                        .then(
                            this.props.history.push({
                                pathname: `/`,
                            })
                        )
                }
            });
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
    };

    closeModal = () => {
        this.props.hideDeleteTimelineModal();
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        // console.log(e);
        this.props.hideDeleteTimelineModal();
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        // console.log(e);
        this.props.hideDeleteTimelineModal();
        this.setState({
            visible: false,
        });
    };


    render(){
        return(
            <Modal
                title="Delete Story"
                visible={this.props.showDeleteTimelineModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{borderRadius: '16px',}}
                footer={[<Button type="default"  key="close" onClick={this.handleCancel}>
                    Close
                </Button>,
                    <Button type="danger" key="submit" onClick={() => this.handleTimelineDelete()}>
                        Delete for good
                    </Button>
                ]}
            >
                <Title level={4} type="danger" style={{textAlign: 'center'}}>Are you sure you want to delete this story?</Title>
                <Text type="danger" style={{alignItems: 'center'}} >This action can not be undone. All the events will be deleted permanently. </Text>
                <br/>
                <Text >An excel file of the story will be downloaded.</Text>


            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showDeleteTimelineModal: state.modalsReducer.showDeleteTimelineModal,
        jwtToken: state.usersReducer.jwtToken,

    }
};

const mapDispatchToProps = dispatch => {
    return{
        hideDeleteTimelineModal: () => {dispatch(controlDeleteTimelineModalAction(false))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteStoryModal));
