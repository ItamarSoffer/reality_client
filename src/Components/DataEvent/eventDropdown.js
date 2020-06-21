import React from 'react';
import {Menu, Dropdown, message} from 'antd';
import axois from 'axios';
// import { Popconfirm, message  } from 'antd';
import MenuIcons from '../Icons/MenuIcons';
import {backendAPI} from "../../Structure/api";


export class EventDropdown extends React.Component{

    handleDelete = () => {
        const delUrl = backendAPI.concat(`/timeline/del_event?username=${this.props.loggedUser}&event_id=${this.props.eventId}`);
        console.log(delUrl);
        axois.get(delUrl)
            .then((response) => {
                if (response.status === 201){
                    message.warning(response.data)
                }
                else if (response.status === 200){
                    message.success(response.data, 1.5)
                }
  });

    };

    render() {
        const menu = (
  <Menu>
    <Menu.Item>
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
