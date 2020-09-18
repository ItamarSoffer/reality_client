import React from 'react';
import {connect} from "react-redux";
import {Menu, message} from 'antd';
import MenuIcons from '../Icons/MenuIcons';
import DownloadExcel from '../Export/ToExcel';
import CreateNewEvent from "../NewEvent/NewEventComponent";
import PermissionsModal from "../permissionsModal/permissionsModal";
import {controlEditAction, setStoryViewModeAction, storyExpandModeAction} from "../../Actions/siteActions";
import {
    controlDeleteTimelineModalAction,
    controlNewEventModalAction,
    controlPermissionsModalAction,
    controlTagsModalAction,
    controlUploadXlsxModalAction
} from "../../Actions/modalsActions";
import DeleteTimelineModal from '../DeleteTimeline/DeleteTimelineModal';
import StoryRangePicker from './Search/StoryRangePicker';
import StoryInSearch from './Search/StorySearch';
import UploadXlsxModal from './UploadXlsxModal/UploadXlsxModal';
import TagsModal from '../Tags/TagsModal';
import TagsSearch from "./Search/TagsSearch";
import {getQueryStringParams,} from "../../Actions/queryStringActions";
import {withRouter} from "react-router";
import {HotKeyPermissionsModal, StoryEditShortcuts} from "../Shortcuts/StoryShortcuts";

const { SubMenu } = Menu;

class TimelineMenu extends React.Component {
    constructor(props) {
        super(props);
        const darkCheck = (this.props.darkMode === "true") || (this.props.darkMode === true);
        this.state = {
            menuTheme: darkCheck ? "dark" : "light",
            visiblePop: false,

        };
    };

    setUrlParam = (key, value) => {
        const pathName = this.props.history.location.pathname;
        let currentSearchQuery = getQueryStringParams(this.props.history.location.search);
        currentSearchQuery[key] = value;
        this.props.history.push(
            {
                pathname: pathName,
                search: "?" + new URLSearchParams(
                    {...currentSearchQuery}
                ).toString()
            });
    };

    handleTimelineMode = () => {
        this.props.storyModeTimelineAction();
        this.setUrlParam('view', 'timeline');
    };

    handleTableMode = () => {
        this.props.storyModeTableAction();
        this.setUrlParam('view', 'table');
    };


    handleCollapseMode = () => {
        this.props.storyCollapseModeAction();
        this.setUrlParam('expand', 'false');
    };

    handleExpandMode = () => {
        this.props.storyExpandModeAction();
        this.setUrlParam('expand', 'true');
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
        const queryParams = getQueryStringParams(this.props.history.location.search);
        let expandMode = this.props.storyExpandMode;
        if (queryParams.expand){
            // the query param will be "true" or "false"
            expandMode = queryParams.expand === 'true';
        }

        // console.log('Dark theme timeline', this.props.darkMode);
        return (
            <div >
                <Menu
                    mode="horizontal"
                    // align="center"
                    selectable={false}
                    style={{display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
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
                        <Menu.Item disabled key="filter_by_tag">
                            <TagsSearch/>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="view" icon={MenuIcons['eye']} title="View">

                        <Menu.Item
                            key="timeline_mode"
                            icon={MenuIcons['nodeindex']}
                            onClick={() => this.handleTimelineMode()}>
                            Timeline
                        </Menu.Item>

                        <Menu.Item
                            key="table_mode"
                            icon={MenuIcons['table']}
                            onClick={() => this.handleTableMode()}>
                            Table
                        </Menu.Item>
                        {/*# TODO: by state */}
                        {expandMode?
                            <Menu.Item
                                key="expand_collapse_mode"
                                icon={MenuIcons['compress']}
                                onClick={() => this.handleCollapseMode()}>
                                Compress
                            </Menu.Item>:
                            <Menu.Item
                                key="expand_collapse_mode"
                                icon={MenuIcons['expand']}
                                onClick={() => this.handleExpandMode()}>
                                Expand
                            </Menu.Item>

                        }



                    </SubMenu>
                    {(["write", "owner", "creator"].indexOf(this.props.role) === -1) ? null :
                        <SubMenu key="m_edit" icon={MenuIcons['edit']} title="Edit">
                            {!this.props.editMode?
                                <Menu.Item key="m_enable_edit" onClick={() => this.props.enableEdit()}>
                                    Enable Edit
                                </Menu.Item>:
                                <Menu.Item key="m_disable_edit" onClick={() => this.props.disableEdit()}>
                                    Disable Edit
                                </Menu.Item>
                            }
                            <Menu.Item key="m_tags" onClick={() => this.props.showTagsModal()}>
                                Tags
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
                {(["owner", "creator"].indexOf(this.props.role) === -1)? null:
                    <div>

                        <HotKeyPermissionsModal/>
                        <PermissionsModal url={this.props.url}/>
                    </div>}
                {(["write", "owner", "creator"].indexOf(this.props.role) === -1)? null:
                    <div>
                        <CreateNewEvent url={this.props.url} />
                        <DeleteTimelineModal
                            url={this.props.url}
                            timelineId={this.props.timelineId}/>
                        <UploadXlsxModal
                            urlAddress={this.props.url}
                            timelineId={this.props.timelineId}/>
                        <TagsModal
                            url={this.props.url}
                            timelineId={this.props.timelineId}
                            role={this.props.role}
                        />
                        <StoryEditShortcuts/>

                    </div>}
            </div>


        );
    }
}
const mapStateToProps = state => {
    return {
        darkMode: state.sitesReducer.darkMode,
        editMode: state.sitesReducer.editMode,
        jwtToken: state.usersReducer.jwtToken,
        storyExpandMode: state.sitesReducer.storyExpandMode

    }
};

const mapDispatchToProps = dispatch => {
    return{
        enableEdit: () => {
            dispatch(controlEditAction(true))
        },
        disableEdit: () => {
            dispatch(controlEditAction(false))
        },
        showNewEventModal: () => {dispatch(controlNewEventModalAction(true))},
        showPermissionsModal: () => {dispatch(controlPermissionsModalAction(true))},
        showDeleteTimelineModal: () => {dispatch(controlDeleteTimelineModalAction(true))},
        showUploadXlsxModal: () => {dispatch(controlUploadXlsxModalAction(true))},
        showTagsModal: () => {dispatch(controlTagsModalAction(true))},
        storyModeTimelineAction: () => {dispatch(setStoryViewModeAction('timeline'))},
        storyModeTableAction: () => {dispatch(setStoryViewModeAction('table'))},
        // storyModePrevTableAction: () => {dispatch(storyModePrevTableAction())},
        storyExpandModeAction: () => {dispatch(storyExpandModeAction(true))},
        storyCollapseModeAction: () => {dispatch(storyExpandModeAction(false))},

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimelineMenu));
