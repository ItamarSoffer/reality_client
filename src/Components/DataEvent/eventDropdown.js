import React from 'react';
import { Menu, Dropdown, Popconfirm, message } from 'antd';
import MenuIcons from '../Icons/MenuIcons';

export class EventDropdown extends React.Component{


    render() {
        const menu = (
  <Menu>
    <Menu.Item>
        Edit
    </Menu.Item>

      <Menu.Item >

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
