import React from 'react';
import {Menu, Dropdown, message} from 'antd';
import axios from 'axios';
// import { Popconfirm, message  } from 'antd';
import MenuIcons from '../Icons/MenuIcons';
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import {backendAPI} from "../../Structure/api";


class EventDropdown extends React.Component{

    handleDelete = () => {
        const delUrl = backendAPI.concat(`/timeline/del_event?username=${this.props.loggedUser}&event_id=${this.props.eventId}`);
        console.log(delUrl);
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
    <Menu.Item disabled={true}>
        Edit
    </Menu.Item>

      <Menu.Item onClick={this.handleDelete} style={{color:"red"}}>

    Delete
    </Menu.Item>

  </Menu>
);
        return(


<Dropdown.Button size="small" overlay={menu} icon={MenuIcons["edit"]} placement="bottomRight">

  </Dropdown.Button>
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
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(EventDropdown);
