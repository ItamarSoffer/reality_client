import React from 'react';
import axois from 'axios';
import {Form, Modal, Input, message, Button} from 'antd';
// import {AutoComplete} from 'antd';
import {connect} from 'react-redux';
import {hidePermissionsModalAction} from "../../Actions/siteActions";
import RolesSelect from "./rolesSelect";
import {backendAPI} from "../../Structure/api";





class PermissionsModal extends React.Component{

    showModal = () => {
    this.setState({
      visible: true,
    });
  };

    onFinish = values => {
        const apiSetPermissions = backendAPI.concat(`/timeline/${this.props.url}/set_permissions/`);
        console.log("VALS", values.username, values.role);
        axois.post(apiSetPermissions, {
            "username": values.username,
            "role": this.state.role,
            // "adding_user": this.props.loggedUser
        }).then((response) => {
  // console.log("resp", response);
  if (response.status === 201){
      message.warning(response.data)
  }
  else if (response.status === 200){
  message.success(response.data, 1.5)

  }
  }).then(() => this.closeModal());
  };

      onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.error('Missing fields!')
  };

  closeModal = () => {
      this.props.hidePermissionsModal();
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    // console.log(e);
  this.props.hidePermissionsModal();
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    // console.log(e);
            this.props.hidePermissionsModal();
    this.setState({
      visible: false,
    });
  };

  onRoleChange = (newRole) => {
      this.setState({
          role: newRole
      })
  };

  render(){
      return (
          <Modal
              title="Edit Permissions"
              visible={this.props.showPermissionsModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              style={{borderRadius: '16px',}}
              footer={[<Button type="default"  key="close" onClick={this.handleCancel}>
            Cancel
        </Button>,
        <Button type="primary" form="permissions_form" key="submit" htmlType="submit">
            Set
        </Button>
        ]}
              >
              <Form
                  id={"permissions_form"}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}

                  >

                  <Form.Item
                    className="username-form"
                    name="username"
                    rules={[{
                        required: true,
                        message: 'Enter Username' }]}
                >
                    <Input autoComplete='off' placeholder={"Username"} />
                </Form.Item>

                  <Form.Item
                    className="role-form"
                    name="role"
                    rules={[{
                        message: 'User Role' }]}
                >
                    <RolesSelect handleRoleChange={this.onRoleChange}/>
                </Form.Item>
              </Form>

          </Modal>
      )
  }

}

const mapStateToProps = state => {
  return {
      showPermissionsModal: state.sitesReducer.showPermissionsModal

  }
};

const mapDispatchToProps = dispatch => {
    return{
        hidePermissionsModal: () => {dispatch(hidePermissionsModalAction())}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsModal);
