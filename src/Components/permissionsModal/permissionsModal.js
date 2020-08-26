import React from 'react';
import axios from 'axios';
import {Form, Modal, message, Button, Typography, Divider} from 'antd';
// import {Input} from 'antd';
import {connect} from 'react-redux';
import {controlPermissionsModalAction} from "../../Actions/modalsActions";
import RolesSelect from "./rolesSelect";
import PermissionsTable from "./permissionsTable"
import {backendAPI} from "../../Structure/api";
import UsersSelect from "./UsersSelect";

const {Text} = Typography;

class PermissionsModal extends React.Component{

    constructor(props){
         super(props);
         this.state = {
             addedPermission: 0
         }
     }

    onFinish = values => {
        const apiSetPermissions = backendAPI.concat(`/timeline/${this.props.url}/set_permissions/`);
        // console.log("VALS", values.username, values.role);
        axios.post(apiSetPermissions, {
            "jwt_token": this.props.jwtToken,
            "username": this.state.selectedUser,
            "role": this.state.role,
        }).then((response) => {
  // console.log("resp", response);
  if (response.status === 201){
      message.warning(response.data)
  }
  else if (response.status === 200){
  message.success(response.data, 1.5);
      this.setState({
          addedPermission: this.state.addedPermission + 1
      })

  }
  })
            // .then(() => this.closeModal());
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

  onUserChange = (selectedUsers) => {
      this.setState(
          {
              selectedUser: selectedUsers
          }
      )

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
            Close
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
                    value={this.state.selectedUser}
                    rules={[{
                        message: 'Enter Username' }]}
                >
                      <UsersSelect handleUserChange={this.onUserChange}/>
                    {/*<Input autoComplete='off' placeholder={"Username"} />*/}
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
              <Text>for public story, add permissions to </Text>
              <Text strong>public</Text>
              <Divider> Current Permissions</Divider>
              <PermissionsTable url={this.props.url} addedPermission={this.state.addedPermission}/>

          </Modal>
      )
  }

}

const mapStateToProps = state => {
  return {
      showPermissionsModal: state.modalsReducer.showPermissionsModal,
      jwtToken: state.usersReducer.jwtToken,

  }
};

const mapDispatchToProps = dispatch => {
    return{
        hidePermissionsModal: () => {dispatch(controlPermissionsModalAction(false))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsModal);
