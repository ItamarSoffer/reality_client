import React from 'react';

import { Menu } from 'antd';
import MenuIcons from '../Icons/MenuIcons';
import DownloadExcel from '../Export/ToExcel';
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
        const menuTheme = this.props.DarkMode === true ? "dark": "light";
        // console.log('Dark theme timeline', this.props.DarkMode);
    return (
      <Menu
          onClick={this.handleClick}
          mode="horizontal"
          align="center"
          selectable={false}
          theme={menuTheme}
      >
          <Menu.Item key={"m_add"} >
                     <CreateNewEvent url={this.props.url} loggedUser={this.props.loggedUser} />
             </Menu.Item>
        <SubMenu icon={MenuIcons["setting"]} title="Filter">
            <Menu.Item disabled key="filter_by_time" >By Date</Menu.Item>
            <Menu.Item disabled key="filter_by_word">By Word</Menu.Item>
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