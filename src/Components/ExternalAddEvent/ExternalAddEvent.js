import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {apiGetTimelinesByUser} from "../../Actions/apiActions";
import {message, Select, Modal, Button} from "antd";
import LoadingPage from "../LoadingComponent/LoadingPage";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

const {Option} = Select;

/*
This component is for getting data from external source,
selecting the wanted story,
and adding the event.

After adding the event, it will be redirected to the selected story.
the data can be any field that is a part of the new Event Modal Component.
I'll use the EditEvent Component because this is exactly what i need, and the data will be passed.


 */

class ExternalAddEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectVisible: true,
            selectedStoryUrl: ''
        };
    }

    componentWillMount() {
        const editRoles = ['write', 'owner', 'creator'];

        apiGetTimelinesByUser(this.props.jwtToken, '')
            .then((response) => {
                    if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        const editableStories = response.data.results.filter( st => editRoles.indexOf(st.role) !== -1);
                        this.setState({
                            stories: editableStories,
                            isLoaded: true});
                    }
                }
            )
    }

    handleStorySelect (storyUrl){
        this.setState({
            selectedStoryUrl: storyUrl
        });
    }

    closeSelectStoryModal() {
        this.setState({
            selectVisible: false
        });
    }

    handleSelectStoryOk() {
        this.closeSelectStoryModal();
    }

    handleSelectStoryCancel() {
        this.closeSelectStoryModal();
        this.props.history.push(
            {pathname: `/`,}
        );

    }

    render() {
        if (this.state.isLoaded){
            return(
                <div>
                    <Modal
                        title={"Select Story"}
                        visible={this.state.selectVisible}
                        onOk={this.handleSelectStoryOk}
                        onCancel={() => this.handleSelectStoryCancel()}
                        okText={"Next"}
                        cancelText={"Cancel"}
                        footer={[<Button type="default"  key="Cancel"
                                         onClick={() => this.handleSelectStoryCancel()}>
                            Cancel
                        </Button>,
                            <Button type="primary"
                                    onClick={() => this.handleSelectStoryOk()}>
                                Next
                            </Button>
                        ]}

                    >
                        <RichTextEditor/>

                        <Select
                            allowClear
                            onChange={value => this.handleStorySelect(value)}
                            style={{width: 400}}
                        >
                            {this.state.stories.map(
                                function (storyData){
                                    return (
                                        <Option value={storyData.url}>
                                            {storyData.name}
                                        </Option>
                                    )
                                }
                            )}
                        </Select>

                    </Modal>

                </div>

            )
        }
        else {
            return <LoadingPage/>
        }

    }
}

const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,

    }
};

const mapDispatchToProps = dispatch => {
    return{
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExternalAddEvent));
