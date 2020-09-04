import React from 'react';
import {Form, Input, message, Modal, Typography, Tabs, Button, } from "antd";
import {controlTagsModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
import TagsColorPicker from "../ColorPicker/TagsColorPicker";
import {Divider} from "antd/es";
import TagsRenderer from "./TagsRenderer";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import TagsEditSelectByName from "./TagsEditSelectByName";
import {apiAddTag, apiDelTag, apiEditTag, apiGetTags} from "../../Actions/apiActions";

const {Title, Text} = Typography;
const { Search } = Input;
const { TabPane } = Tabs;



class TagsModal extends React.Component{
    editTagFormRef = React.createRef();


    constructor(props){
        super(props);
        this.state= {
            color: "#f5222d",
            isLoaded: false,
            storyTagsData: [],
            tagChangeColor: null,
            tagChangeName: ''
        }
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
    };

    componentWillMount() {
        this.fetchStoryTags();
    }

    fetchStoryTags = () => {
        apiGetTags(this.props.jwtToken, this.props.url)
            .then( (data) => {
                this.setState( {
                    storyTagsData: data,
                    isLoaded: true,
                });
            })
    };

    handleAdd = (value) => {
        if (value.length === 0){
            message.warning("Empty tag");
            return;
        }
        apiAddTag(this.props.jwtToken, this.props.url, value, this.state.color)
        .then((response) => {
            // console.log("resp", response);
            if (response.status === 201){
                message.warning(response.data)
            }
            else if (response.status === 200){
                message.success(response.data, 1);
                this.fetchStoryTags();
            }
        });
    };

    closeModal = () => {
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

    tagCloseHandler = (tagId) => {
        apiDelTag(this.props.jwtToken, this.props.url, tagId)
            .then((response) => {
                    if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        message.success(response.data, 1.5);
                        this.props.setReRenderTimeline(1);
                        this.fetchStoryTags();

                    }
                }
            )
    };

    // edit tag functions:

    onTagChangeColorChange = (newColor) => {
        this.setState({
            tagChangeColor: newColor
        });
        console.log(newColor);
    };

    onEditTagChange = (selectedTag) => {
        this.setState({
            targetTag: selectedTag
        })
    };

    handleEditTagNameChange = (e) => {
        this.setState({
            tagChangeName: e.target.value
        })
    };

    handleUpdateTag = () => {
        // if success:
        apiEditTag(this.props.jwtToken, this.props.url, this.state.targetTag, this.state.tagChangeName, this.state.tagChangeColor )
            .then((response) => {
                if (response.status === 201){
                    message.warning(response.data);
                    this.editTagFormRef.current.resetFields();

                }
                else if (response.status === 200){
                    message.success(response.data, 1);
                    this.editTagFormRef.current.resetFields();
                    this.fetchStoryTags();
                    this.props.setReRenderTimeline(1);
                    this.setState({
                        tagChangeColor: null,
                        tagChangeName: ''
                    })
                }
            });
    };


    render(){
        let defaultTag = "1";
        if (this.props.editMode){
            defaultTag = "2"
        }

        return(
            <Modal
                title="Story Tags"
                visible={this.props.showTagsModal}
                // onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{borderRadius: '16px',}}
                footer={null}
            >
                <Tabs defaultActiveKey={defaultTag}>
                    <TabPane tab="Create" key="1">
                        <Title level={4} style={{textAlign: 'center'}}>Create New</Title>

                        <Form
                            id={"create_tag_form"}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                className="tag_name"
                                // label="כותרת"
                                name="tag"
                                rules={[{
                                    required: true,
                                    message: 'Required, max 15 chars.'}]}
                            >
                                <Search
                                    autoComplete='off'
                                    placeholder={"Tag name"}
                                    enterButton="Add"
                                    onSearch={this.handleAdd}
                                    maxLength={15}

                                />
                            </Form.Item>
                            <Form.Item
                                className="link-form"
                                //label="צבע"
                                name="color"
                                rules={[{
                                    message: 'Event Color' }]}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <TagsColorPicker handleColorChange={this.onColorChange}/>
                                </div>
                            </Form.Item>
                        </Form>
                        <Divider/>
                        <Title level={4} style={{textAlign: 'center'}}>Exists:</Title>
                        <TagsRenderer tags={this.state.storyTagsData} handleTagClose={this.tagCloseHandler}/>
                    </TabPane>

                    {
                        !this.props.editMode? null:
                            <TabPane tab="Edit" key="2">

                                <Title level={4} style={{textAlign: 'center'}}>Edit Tags</Title>
                                <Form
                                    id={"edit_tag_form"}
                                    onFinishFailed={this.onFinishFailed}
                                    ref={this.editTagFormRef}
                                >
                                    <Form.Item
                                        className="link-form"
                                        // label="Tag"
                                        name="target_Tag">
                                        <TagsEditSelectByName handleTagChange={this.onEditTagChange} tags={this.state.storyTagsData}/>
                                    </Form.Item>
                                    <Form.Item
                                        className="link-form"
                                        // label="New Name"
                                        name="new_name">
                                        <Input autoComplete='off' placeholder={"New Tag Name"}
                                               onChange={this.handleEditTagNameChange}
                                               style={{width: 200}}
                                               maxLength={15}

                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className="link-form"
                                        // label="New Color"
                                        name="new_color">
                                        <TagsColorPicker handleColorChange={this.onTagChangeColorChange}/>
                                    </Form.Item>
                                    <Form.Item
                                        className="link-form"
                                        // label="New Color"
                                        name="submit">
                                        <Button type="primary" onClick={this.handleUpdateTag} >
                                            Update Tag
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Divider/>

                                <Title level={4} style={{textAlign: 'center'}}>Delete Tags</Title>
                                <Text type="danger">Closing a tag will delete it from all events.</Text>
                                <br/>
                                <br/>
                                <TagsRenderer tags={this.state.storyTagsData} deletable={this.props.editMode} handleTagClose={this.tagCloseHandler}/>

                            </TabPane>
                    }

                </Tabs>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showTagsModal: state.modalsReducer.showTagsModal,
        jwtToken: state.usersReducer.jwtToken,
        editMode: state.sitesReducer.editMode,


    }
};

const mapDispatchToProps = dispatch => {
    return{
        hideTagsModalAction: () => {dispatch(controlTagsModalAction(false))},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(TagsModal);
