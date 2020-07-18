import React from 'react';
import {Button, Form, Input, message, Modal, Typography, Tag, Col, Row} from "antd";
import {hideTagsModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
import TagsColorPicker from "../ColorPicker/TagsColorPicker";
import {Divider} from "antd/es";
import {backendAPI} from "../../Structure/api";
import axios from 'axios';
import RealityCard from "../RealityCard/RealityCard";
const {Text, Title} = Typography;
const { Search } = Input;



class TagsModal extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            color: "#f5222d",
            isLoaded: false,
            storyTagsData: [],
        }
    }
    componentWillMount() {
        this.fetchStoryTags();
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
      };

    fetchStoryTags = () => {
          const addTagApi = backendAPI.concat(`/timeline/${this.props.url}/get_tags`);
        axios.post(addTagApi, {
            jwt_token: this.props.jwtToken,
        }).then(res => res.data)
            .then(data => data.map(e => ({...e, nameAndColor: [e.tag_name, e.tag_color]})))
            .then( (data) => {
                this.setState( {
                    storyTagsData: data,
                    isLoaded: true,
                });
            })
    };

    handleAdd = (value) => {
        const addTagApi = backendAPI.concat(`/timeline/${this.props.url}/add_tag`);
        axios.post(addTagApi, {
            jwt_token: this.props.jwtToken,
            tag_name : value,
            tag_color: this.state.color
        }).then((response) => {
  // console.log("resp", response);
  if (response.status === 201){
      message.warning(response.data)
  }
  else if (response.status === 200){
  message.success(response.data, 1);
  this.fetchStoryTags();
      // this.setState({
      //     addedPermission: this.state.addedPermission + 1
      // })

  }
  });
        console.log(this.props.timelineId);
        console.log(this.props.url);
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
               {this.state.storyTagsData.map(
                        function(tagData){
                            return (<Tag color={tagData.tag_color} id={tagData.tag_id}>
                                {tagData.tag_name}
                            </Tag>)
                        }
                    )}




               {/*{this.state.storyTagsData.map( tagData => (<Tag color={tagData[1]}> {tagData[0]}</Tag>}))}*/}



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

export default connect(mapStateToProps, mapDispatchToProps)(TagsModal);
