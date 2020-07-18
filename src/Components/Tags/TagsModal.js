import React from 'react';
import {Button, Form, Input, message, Modal, Typography} from "antd";
import {hideTagsModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import TagsColorPicker from "../ColorPicker/TagsColorPicker";
import {Divider} from "antd/es";
const {Text, Title} = Typography;
const { Search } = Input;

class TagsModal extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            color: "#f5222d"
        }
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
      };

    handleAdd = (value) => {
        console.log(this.props.timelineId);
        console.log(value);
        console.log(this.state.color);
    };

    closeModal = () => {
          this.props.hideTagsModalAction();
        this.setState({
          visible: false,
        });
      };

    handleOk = () => {
        // console.log(e);
      this.props.hideTagsModalAction();
      this.setState({
          visible: false,
        });
      };

    handleCancel = () => {
        // console.log(e);
        this.props.hideTagsModalAction();
        this.setState({
          visible: false,
        });
      };

    onColorChange = (newColor) => {
      this.setState({
          color: newColor
      })
  };


    render(){
        return(
           <Modal
              title="Story Tags"
              visible={this.props.showTagsModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              style={{borderRadius: '16px',}}
        //       footer={[<Button type="default"  key="close" onClick={this.handleCancel}>
        //     Close
        // </Button>,
        // <Button type="danger" key="submit" form="create_tag_form" onClick={() => this.handleTimelineDelete()}>
        //     Delete for good
        // </Button>
        // ]}
              >
               <Title level={4} style={{textAlign: 'center'}}>Create New Tag</Title>

               <Form
                id={"create_tag_form"}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
>
                   <Form.Item
                    className="tag_name"
                    // label="כותרת"
                    name="title"
                    rules={[{
                        required: true}]}
                >
                       <Search
                           autoComplete='off'
                           placeholder={"Tag name"}
                           enterButton="Add"
                           onSearch={this.handleAdd}

                       />
                   </Form.Item>
                   <Form.Item
                    className="link-form"
                    //label="צבע"
                    name="color"
                    rules={[{
                        message: 'Event Color' }]}
                >
                       <TagsColorPicker handleColorChange={this.onColorChange}/>
                   </Form.Item>
               </Form>
               <Divider/>
               <Title level={4} style={{textAlign: 'center'}}>Existing tags:</Title>



           </Modal>
        )
    }
}

const mapStateToProps = state => {
  return {
      showTagsModal: state.modalsReducer.showTagsModal,
      jwtToken: state.usersReducer.jwtToken,

  }
};

const mapDispatchToProps = dispatch => {
    return{
        hideTagsModalAction: () => {dispatch(hideTagsModalAction())}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TagsModal));
