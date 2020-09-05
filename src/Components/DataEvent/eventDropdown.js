import React from 'react';
<<<<<<< HEAD
import { Menu, Dropdown } from 'antd';
=======
import { Menu, Dropdown, } from 'antd';
// import { Popconfirm, message  } from 'antd';
>>>>>>> 79aa366... add permissions control
import MenuIcons from '../Icons/MenuIcons';
<<<<<<< HEAD
=======
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import {backendAPI} from "../../Structure/api";

>>>>>>> da2bd71... add auto update after change (add or delete event)

class EventDropdown extends React.Component{

<<<<<<< HEAD
=======
    handleDelete = () => {
        const delUrl = backendAPI.concat(`/timeline/del_event?event_id=${this.props.eventId}`);
        console.log(delUrl);
        axois.get(delUrl)
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

>>>>>>> da2bd71... add auto update after change (add or delete event)
    render() {
        const menu = (
  <Menu>
    <Menu.Item>
        Edit
    </Menu.Item>
    <Menu.Item >Delete</Menu.Item>
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
  }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(EventDropdown);
