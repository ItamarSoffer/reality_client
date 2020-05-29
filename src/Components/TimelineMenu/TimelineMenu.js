import React from 'react';

import { Menu, Button } from 'antd';
import MenuIcons from '../Icons/MenuIcons';
import DownloadExcel from '../Export/ToExcel';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import CreateNewEvent from "../NewEvent/NewEventComponent";

const { SubMenu } = Menu;

class TimelineMenu extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
          onClick={this.handleClick}
          mode="horizontal"
          align="center"
          selectable={false}
          // theme={"dark"}
      >
          <Menu.Item key={"m_add"} >
                     <CreateNewEvent url={this.props.url} />
             </Menu.Item>
        <SubMenu icon={MenuIcons["setting"]} title="Filter">
            <Menu.Item key="filter_by_time" >By Date</Menu.Item>
            <Menu.Item key="filter_by_word">By Word</Menu.Item>
        </SubMenu>

         <SubMenu key="export" icon={MenuIcons['download']} title="Export">
              <Menu.Item key="export_excel" icon={MenuIcons['excel']} onClick={() => DownloadExcel(this.props.url)}>
                      Excel
            </Menu.Item>

            </SubMenu>



      </Menu>
    );
  }
}

export default TimelineMenu