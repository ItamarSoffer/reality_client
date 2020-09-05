import React from 'react';
<<<<<<< HEAD
import { Menu, Dropdown } from 'antd';
=======
import { Menu, Dropdown, } from 'antd';
// import { Popconfirm, message  } from 'antd';
>>>>>>> 79aa366... add permissions control
import MenuIcons from '../Icons/MenuIcons';

export class EventDropdown extends React.Component{

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
