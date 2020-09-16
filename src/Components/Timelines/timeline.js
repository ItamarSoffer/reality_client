import React from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import {Typography, BackTop, ConfigProvider, message} from 'antd';
import 'react-vertical-timeline-component/style.min.css';
import { withRouter } from "react-router-dom";
import DataEvent from '../DataEvent/dataEventComponent';
import LoadingPage from '../LoadingComponent/LoadingPage';
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import StoryTable from '../StoryTable/StoryTable';
import {getQueryStringParams} from "../../Actions/queryStringActions";
import {apiEditStoryDescription, apiEditStoryName, apiGetEvents} from "../../Actions/apiActions";
import {getStoryEventsAction, eventsCompareSorter} from "../../Actions/eventsActions";
import {HotKeyCheck, AllKeys, StoryShortcuts} from "../Shortcuts/StoryShortcuts";


const { Title } = Typography;

class Timeline extends React.Component {



    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            storyName: this.props.basicData.name,
            storyDescription: this.props.basicData.description
        }
    }

    fetchData(fetchExtraData=true) {
        const storyUrl = this.props.url;
        const queryParams = getQueryStringParams(this.props.history.location.search);

        const minTime = queryParams.min_time? queryParams.min_time: null;
        const maxTime = queryParams.max_time? queryParams.max_time: null;
        const searchString = queryParams.search_string? queryParams.search_string: null;
        const searchTags = queryParams.tags? queryParams.tags.split(","): null;

        apiGetEvents(this.props.jwtToken, storyUrl, minTime, maxTime, searchString, searchTags, fetchExtraData )
            .then((response) => {
                    if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        this.setState({
                            isLoaded: true});
                        this.props.getStoryEvents(response.data.events)
                    }
                }
            )

    }

    componentWillMount() {
        document.title = `Story: ${this.state.storyName}`;
        this.fetchData(false);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.timelineRenderCount === 1) {
            this.fetchData();
            this.props.setReRenderTimeline(0);
        }
        if (nextState.storyName !== this.state.storyName){
            document.title = `Story: ${nextState.storyName}`;
        }
    }

    handleNameChange =(newName) => {
        // console.log("new name", newName);
        if (newName.length === 0){
            message.warning("Name can not be empty!");
            return
        }

        apiEditStoryName(this.props.jwtToken, this.props.url, newName)
            .then((response) => {
                    if (response.status === 201){
                        message.warning(response.data)
                    }
                    else if (response.status === 200){
                        message.success(response.data, 1);
                        this.setState({storyName: newName});
                    }
                }
            );
    };

    handleDescriptionChange =(newDescription) => {
        // console.log("new Description", str);

        apiEditStoryDescription(this.props.jwtToken, this.props.url, newDescription)
            .then((response) => {
                    if (response.status === 201){
                        message.warning(response.data)
                    }
                    else if (response.status === 200){
                        message.success(response.data, 1);
                        this.setState({storyDescription: newDescription});
                    }
                }
            );
    };



    render() {
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        }
        else if (this.props.events.length === 0){
            return (
                <div>

                    <Title level={1} style={{textAlign:'center'}}>{this.props.basicData.name}</Title>
                    <Title level={2} style={{textAlign:'center'}}>No events found.</Title>

                </div>
            )
        }
        else
        {
            //returns the timeline.
            const urlAddress = this.props.url;
            // extracts the view mode from url.
            const queryParams = getQueryStringParams(this.props.history.location.search);
            let viewMode = this.props.storyViewMode;
            if (queryParams.view){
                viewMode = queryParams.view;
            }
            let nameOnChange = false;
            let descriptionOnChange = false;
            if (this.props.editMode){
                nameOnChange = { onChange: (str) => this.handleNameChange(str)};
                descriptionOnChange = { onChange: (str) => (this.handleDescriptionChange(str)) };

            }
            return (
                <div
                    //style={{backgroundColor: '#ccc'}}
                >
                    <ConfigProvider direction='rtl>'>
                        <Title level={1} editable={nameOnChange} style={{textAlign:'center'}}>{this.state.storyName}</Title>
                        <Title level={4} editable={descriptionOnChange} style={{textAlign:'center'}}>{this.state.storyDescription}</Title>
                    </ConfigProvider>
                    {viewMode !== 'timeline'?
                        <StoryTable
                            expandMode={this.props.storyExpandMode}
                            url={urlAddress}
                            timeline_events={Object.values(this.props.events).sort(eventsCompareSorter)}
                            /> : null}
                    {viewMode === 'timeline' ?
                        <VerticalTimeline
                            id={this.props.basicData.id}
                            style={{background: '#f00'}}>
                            {Object.values(this.props.events).sort(eventsCompareSorter).map(
                                function (evt) {
                                    return <DataEvent
                                        data={evt}
                                        url={urlAddress} />
                                })}
                        </VerticalTimeline> : null
                    }
                    <BackTop />
                    <StoryShortcuts/>

                </div>

            );
        }
    }
}
const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,
        storyViewMode: state.sitesReducer.storyViewMode,
        storyExpandMode: state.sitesReducer.storyExpandMode,
        editMode: state.sitesReducer.editMode,

    }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},
        getStoryEvents: (events) => {dispatch(getStoryEventsAction(events))},
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Timeline));
