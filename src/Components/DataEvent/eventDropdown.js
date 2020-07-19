import React from 'react';
import {Menu, Dropdown, message} from 'antd';
import axios from 'axios';
import MenuIcons from '../Icons/MenuIcons';
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import {backendAPI} from "../../Structure/api";
import {showEditEventModalAction} from "../../Actions/modalsActions";
import EditEvent from "../NewEvent/EditEvent";



class EventDropdown extends React.Component{

    onTagsChange = (newTags) => {
      this.setState({
          tags: newTags
      })
    };

    handleDelete = () => {
        const delUrl = backendAPI.concat(`/timeline/del_event?event_id=${this.props.eventId}`);
        axios.post(delUrl, {
            jwt_token: this.props.jwtToken,
        })
            .then((response) => {
                if (response.status === 201){
                    message.warning(response.data)
                }
                else if (response.status === 200){
                    message.success(response.data, 1.5);
                    this.props.setReRenderTimeline(1);

                }
  });

    };

    render() {
        const menu = (
  <Menu>
      <Menu.Item onClick={() => this.props.showEditEventModal(this.props.data.event_id)}>
        Edit
      </Menu.Item>

      <Menu.Item onClick={this.handleDelete} style={{color:"red"}}>
        Delete
      </Menu.Item>

  </Menu>
);
        return(
            <div>

<Dropdown.Button size="small" overlay={menu} icon={MenuIcons["edit"]} placement="bottomRight">

  </Dropdown.Button>
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
        showEditEventModal: (eventId) => {dispatch(showEditEventModalAction(eventId))},

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(EventDropdown);
