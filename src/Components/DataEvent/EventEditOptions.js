import React from 'react';
import {message, Space, Button} from 'antd';
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import {controlEditEventModalAction} from "../../Actions/modalsActions";
import EditEvent from "../NewEvent/EditEvent";
import {apiDelEvent} from "../../Actions/apiActions";
import {deleteEvent} from "../../Actions/eventsActions";



class EventEditOptions extends React.Component{

    onTagsChange = (newTags) => {
        this.setState({
            tags: newTags
        })
    };

    handleDelete = () => {
        apiDelEvent(this.props.jwtToken, this.props.eventId)
            .then((response) => {
                if (response.status === 201){
                    message.warning(response.data)
                }
                else if (response.status === 200){
                    message.success(response.data, 1.5);
                    // this.props.setReRenderTimeline(1);
                    this.props.deleteEvent(this.props.eventId);

                }
            });

    };

    render() {
        return(
            <div>
                <Space>
                    <Button size={"small"}
                            onClick={() => this.props.showEditEventModal(this.props.data.event_id)}
                    > Edit</Button>
                    <Button danger size={"small"}
                            onClick={this.handleDelete}
                    > Delete</Button>
                </Space>
                <EditEvent
                    key={this.props.data.event_id}
                    eventData={this.props.data}
                    eventId={this.props.data.event_id}
                    url={this.props.url}

                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,

    }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},
        showEditEventModal: (eventId) => {dispatch(controlEditEventModalAction(eventId))},
        deleteEvent: (eventId) => {dispatch(deleteEvent(eventId))},


    }

};

export default connect(mapStateToProps, mapDispatchToProps)(EventEditOptions);
