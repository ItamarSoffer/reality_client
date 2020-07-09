import React from 'react';
import axios from 'axios';
import {Form, Modal, Input, message, Button, Typography, Divider} from 'antd';
// import {AutoComplete} from 'antd';
import {connect} from 'react-redux';
import {hidePermissionsModalAction} from "../../Actions/siteActions";
import RolesSelect from "./rolesSelect";
import PermissionsTable from "./permissionsTable"
import {backendAPI} from "../../Structure/api";

const {Text} = Typography;





class PermissionsModal extends React.Component{

    constructor(props){
         super(props);
         this.state = {
             addedPermission: 0
         }

     }

    showModal = () => {
    this.setState({
      visible: true,
    });
  };

    onFinish = values => {
        const apiSetPermissions = backendAPI.concat(`/timeline/${this.props.url}/set_permissions/`);
        console.log("VALS", values.username, values.role);
        axios.post(apiSetPermissions, {
            "jwt_token": this.props.jwtToken,
            "username": values.username,
            "role": this.state.role,
            // "adding_user": this.props.loggedUser
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
      showPermissionsModal: state.sitesReducer.showPermissionsModal,
      jwtToken: state.usersReducer.jwtToken,

  }
};

const mapDispatchToProps = dispatch => {
    return{
        hidePermissionsModal: () => {dispatch(hidePermissionsModalAction())}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsModal);
