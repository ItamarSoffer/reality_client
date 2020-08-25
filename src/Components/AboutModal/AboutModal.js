import React from 'react';
import {Form, Input, message, Modal, Typography, Tabs, Button, Drawer } from "antd";
import {controlAboutsModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
// import {Divider} from "antd/es";
// import {backendAPI} from "../../Structure/api";
// import axios from 'axios';
import {setReRenderTimelineAction} from "../../Actions/siteActions";

const {Title, Text} = Typography;
const { Search } = Input;
const { TabPane } = Tabs;



class AboutModal extends React.Component{


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
           <Modal
              title="About"
              visible={this.props.showAboutModal}
              onCancel={this.handleCancel}
              style={{borderRadius: '16px',}}
              footer={null}
              >
               <Tabs >
                   <TabPane tab="About Story" key="1_about">
                        <Title level={4} style={{textAlign: 'center'}}>Story the best thing ever</Title>

                   </TabPane>

                    <TabPane tab="Icons" key="2_icons">

                       <Title level={4} style={{textAlign: 'center'}}>all icons</Title>

                   </TabPane>

                   <TabPane tab="Icons" key="3_contact">

                       <Title level={4} style={{textAlign: 'center'}}>Contant </Title>

                   </TabPane>

            </Tabs>
           </Modal>
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
