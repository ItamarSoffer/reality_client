import React from 'react';
import {connect} from "react-redux";
import {Menu, message} from 'antd';
import axios from 'axios';
import MenuIcons from '../Icons/MenuIcons';
import DownloadExcel from '../Export/ToExcel';
import CreateNewEvent from "../NewEvent/NewEventComponent";
import PermissionsModal from "../permissionsModal/permissionsModal";
import {enableEditAction, disableEditAction} from "../../Actions/siteActions";
import {showNewEventModalAction, showPermissionsModalAction} from "../../Actions/siteActions";
import {backendAPI} from "../../Structure/api";
import {withRouter} from "react-router";

const { SubMenu } = Menu;

class TimelineMenu extends React.Component {
    constructor(props) {
        super(props);
        const darkCheck = (this.props.darkMode === "true") || (this.props.darkMode === true);
        this.state = {
            current: 'mail',
            menuTheme: darkCheck ? "dark" : "light"

        };
    };

  handleClick = e => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  handleTimelineDelete = () => {
      const delTimelineUrl = backendAPI.concat(`/timeline/del_timeline?timeline_id=${this.props.timelineId}`);
      message.info("Get a backup on us :)");
      DownloadExcel(this.props.url, this.props.jwtToken);
      axios.post(delTimelineUrl, {
            jwt_token: this.props.jwtToken,
        })
            .then((response) => {
                if (response.status === 201){
                    message.warning(response.data)
                }
                else if (response.status === 200){
                    message.success(response.data, 1.5)
                        .then(
                            this.props.history.push({
                                pathname: `/`,
                            })
                        )
                }
  });


  };



    render() {
        const menuTheme = this.props.DarkMode === true ? "dark": "light";
        // console.log('Dark theme timeline', this.props.DarkMode);
    return (
        <div>
      <Menu
          onClick={this.handleClick}
          mode="horizontal"
          align="center"
          selectable={false}
          theme={menuTheme}
      >
          {(["write", "owner"].indexOf(this.props.role) === -1) ? null :
          <Menu.Item key={"m_add"} icon={MenuIcons["plus"]} onClick={() => this.props.showNewEventModal()}>
                    Add Event
         </Menu.Item>}
          {(this.props.role !== 'owner')? null:
          <Menu.Item key={"m_permissions"} icon={MenuIcons["user"]}
                             onClick={() => this.props.showPermissionsModal()}>
                Permissions
         </Menu.Item>}

        <SubMenu icon={MenuIcons["setting"]} title="Filter">
            <Menu.Item disabled key="filter_by_time" >By Date</Menu.Item>
            <Menu.Item disabled key="filter_by_word">By Word</Menu.Item>
        </SubMenu>
          {(["write", "owner"].indexOf(this.props.role) === -1) ? null :
              <SubMenu key="m_edit" icon={MenuIcons['edit']} title="Edit">
                  <Menu.Item key="m_enable_edit" onClick={() => this.props.enableEdit()}>
                      Enable Edit
                  </Menu.Item>
                  <Menu.Item key="m_disable_edit" onClick={() => this.props.disableEdit()}>
                      Disable Edit
                  </Menu.Item>
                  <Menu.Item key="m_del_timeline" style={{color:"red"}} onClick={() => this.handleTimelineDelete()}>
                      Delete Timeline
                  </Menu.Item>
              </SubMenu>
          }


         <SubMenu key="export" icon={MenuIcons['download']} title="Export">
              <Menu.Item key="export_excel" icon={MenuIcons['excel']}
                         onClick={() => DownloadExcel(this.props.url, this.props.jwtToken)}>
                      Excel
            </Menu.Item>

            </SubMenu>

      </Menu>
            <CreateNewEvent url={this.props.url} />
            <PermissionsModal url={this.props.url}/>
            </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      DarkMode: state.sitesReducer.DarkMode,
      editMode: state.sitesReducer.editMode,
      jwtToken: state.usersReducer.jwtToken,

  }
};

const mapDispatchToProps = dispatch => {
    return{
        enableEdit: () => {dispatch(enableEditAction())},
        disableEdit: () => {dispatch(disableEditAction())},
        showNewEventModal: () => {dispatch(showNewEventModalAction())},
        showPermissionsModal: () => {dispatch(showPermissionsModalAction())},

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimelineMenu));
