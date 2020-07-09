import React from 'react';
import {Button, Divider, Form, Input, message, Modal, Typography} from "antd";
import {hideDeleteTimelineModalAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import RolesSelect from "../permissionsModal/rolesSelect";
import PermissionsTable from "../permissionsModal/permissionsTable";
import {backendAPI} from "../../Structure/api";
import axios from "axios";
import DownloadExcel from "../Export/ToExcel";
import {withRouter} from "react-router";
const {Text, Title} = Typography;

class DeleteTimelineModal extends React.Component{
    constructor(props){
         super(props);
     }

      handleTimelineDelete = () => {
          const delTimelineUrl = backendAPI.concat(`/timeline/del_timeline?timeline_id=${this.props.timelineId}`);
          message.info("Get a backup on us :)", 3);
          DownloadExcel(this.props.url, this.props.jwtToken);
          axios.post(delTimelineUrl, {
              jwt_token: this.props.jwtToken,
          })
              .then((response) => {
                  if (response.status === 201) {
                      message.warning(response.data)
                  } else if (response.status === 200) {
                      this.props.hideDeleteTimelineModalAction();
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
          this.props.hideDeleteTimelineModalAction();
        this.setState({
          visible: false,
        });
      };

    handleOk = () => {
        // console.log(e);
      this.props.hideDeleteTimelineModalAction();
        this.setState({
          visible: false,
        });
      };

    handleCancel = () => {
        // console.log(e);
                this.props.hideDeleteTimelineModalAction();
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
      showDeleteTimelineModal: state.sitesReducer.showDeleteTimelineModal,
      jwtToken: state.usersReducer.jwtToken,

  }
};

const mapDispatchToProps = dispatch => {
    return{
        hideDeleteTimelineModalAction: () => {dispatch(hideDeleteTimelineModalAction())}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteTimelineModal));
