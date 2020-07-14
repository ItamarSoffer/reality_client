import React from 'react';
import {connect} from "react-redux";
import {Menu, message} from 'antd';
import MenuIcons from '../Icons/MenuIcons';
import DownloadExcel from '../Export/ToExcel';
import CreateNewEvent from "../NewEvent/NewEventComponent";
import PermissionsModal from "../permissionsModal/permissionsModal";
import {enableEditAction, disableEditAction} from "../../Actions/siteActions";
import {
    showNewEventModalAction,
    showPermissionsModalAction,
    showDeleteTimelineModalAction,
showUploadXlsxModalAction} from "../../Actions/modalsActions";
import DeleteTimelineModal from '../DeleteTimeline/DeleteTimelineModal';
import StoryRangePicker from './Search/StoryRangePicker';
import StoryInSearch from './Search/StorySearch';
import UploadXlsxModal from './UploadXlsxModal/UploadXlsxModal';

const { SubMenu } = Menu;

class TimelineMenu extends React.Component {
    constructor(props) {
        super(props);
        const darkCheck = (this.props.darkMode === "true") || (this.props.darkMode === true);
        this.state = {
            current: 'mail',
            menuTheme: darkCheck ? "dark" : "light",
            visiblePop: false,

        };
    };

  handleClick = e => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };


  cancel = e => {
  console.log(e);
  message.error('Click on No');
    };

  confirm = e => {
  console.log(e);
  message.success('Click on Yes');
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
          {(["write", "owner", "creator"].indexOf(this.props.role) === -1) ? null :
          <Menu.Item key={"m_add"} icon={MenuIcons["plus"]} onClick={() => this.props.showNewEventModal()}>
                    Add Event
         </Menu.Item>}

        <SubMenu icon={MenuIcons["filter"]} title="Filter">
            <Menu.Item disabled key="filter_by_time" >

            <StoryRangePicker />
            </Menu.Item>
            <Menu.Item disabled key="filter_by_word">
                <StoryInSearch/>
            </Menu.Item>
        </SubMenu>
          {(["write", "owner", "creator"].indexOf(this.props.role) === -1) ? null :
              <SubMenu key="m_edit" icon={MenuIcons['edit']} title="Edit">
                  <Menu.Item key="m_enable_edit" onClick={() => this.props.enableEdit()}>
                      Enable Edit
                  </Menu.Item>
                  <Menu.Item key="m_disable_edit" onClick={() => this.props.disableEdit()}>
                      Disable Edit
                  </Menu.Item>
                  <Menu.Item key="m_del_timeline" style={{color:"red"}} onClick={() => this.props.showDeleteTimelineModal()}>

                      Delete Story

                  </Menu.Item>
              </SubMenu>
          }

         <SubMenu key="m_more" icon={MenuIcons['setting']} title="More">
             {(["owner", "creator"].indexOf(this.props.role) === -1)? null:
          <Menu.Item key={"m_permissions"} icon={MenuIcons["user"]}
                             onClick={() => this.props.showPermissionsModal()}>
                Permissions
         </Menu.Item>}

         <SubMenu key="export" icon={MenuIcons['download']} title="Export">
              <Menu.Item key="export_excel" icon={MenuIcons['excel']}
                         onClick={() => DownloadExcel(this.props.url, this.props.jwtToken)}>
                      Excel
            </Menu.Item>

            </SubMenu>

          {(["write", "owner", "creator"].indexOf(this.props.role) === -1)? null:
          <Menu.Item key={"m_upload"} icon={MenuIcons["upload"]}
                             onClick={() => this.props.showUploadXlsxModal()}>
                Import
         </Menu.Item>}
         </SubMenu>

      </Menu>
            <CreateNewEvent url={this.props.url} />
            <PermissionsModal url={this.props.url}/>
            <DeleteTimelineModal
                url={this.props.url}
                timelineId={this.props.timelineId}/>
            <UploadXlsxModal
                url={this.props.url}
                timelineId={this.props.timelineId}/>

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
        showDeleteTimelineModal: () => {dispatch(showDeleteTimelineModalAction())},
        showUploadXlsxModal: () => {dispatch(showUploadXlsxModalAction())},

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineMenu);
