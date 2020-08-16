import React from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import {Typography, BackTop, ConfigProvider, message} from 'antd';
import 'react-vertical-timeline-component/style.min.css';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import DataEvent from '../DataEvent/dataEventComponent';
import LoadingPage from '../LoadingComponent/LoadingPage';
import {backendAPI} from "../../Structure/api";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import StoryTable from '../StoryTable/StoryTable';
import {getQueryStringParams} from "../../Actions/queryStringActions";


const { Title } = Typography;

class Timeline extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            timeline_events: [],
            storyName: this.props.basicData.name,
            storyDescription: this.props.basicData.description
        }
    }

    fetchData(fetchExtraData=true) {
        const TimelineUrl = this.props.url;
        const apiGetEvents = backendAPI.concat(`/timeline/${TimelineUrl}`);
        const queryParams = getQueryStringParams(this.props.history.location.search);

        const minTime = queryParams.min_time? queryParams.min_time: null;
        const maxTime = queryParams.max_time? queryParams.max_time: null;
        const searchString = queryParams.search_string? queryParams.search_string: null;
        const searchTags = queryParams.tags? queryParams.tags.split(","): null;

        let postData = {
                jwt_token: this.props.jwtToken,
                min_time: minTime,
                max_time: maxTime,
                search_string: searchString,
                tags: searchTags
        };
        if (fetchExtraData){
            postData['extra_data'] = true;
        }

        axios.post(apiGetEvents, postData)
            .then((response) => {
                if (response.status === 201) {
                    message.warning(response.data)
                } else if (response.status === 200) {
                    this.setState({
                    timeline_events:response.data.events,
                    isLoaded: true});
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

    handleNameChange =(str) => {
        // console.log("new name", str);
        if (str.length === 0){
            message.warning("Name can not be empty!");
            return
        }

        const editPropertyApi = backendAPI.concat(`/timeline/${this.props.url}/edit_property`);
        axios.post(editPropertyApi, {
            jwt_token: this.props.jwtToken,
            new_name: str
        }).then((response) => {
            if (response.status === 201){
                message.warning(response.data)
            }
            else if (response.status === 200){
                message.success(response.data, 1);
                this.setState({storyName: str});
            }
        }
        );
    };

    handleDescriptionChange =(str) => {
        // console.log("new Description", str);

        const editPropertyApi = backendAPI.concat(`/timeline/${this.props.url}/edit_property`);
        axios.post(editPropertyApi, {
            jwt_token: this.props.jwtToken,
            new_description: str
        }).then((response) => {
            if (response.status === 201){
                message.warning(response.data)
            }
            else if (response.status === 200){
                message.success(response.data, 1);
                this.setState({storyDescription: str});
            }
        }
        );
    };



    render() {
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        }
        else if (this.state.timeline_events.length === 0){
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
                        viewMode={viewMode}
                        url={urlAddress}
                        timeline_events={this.state.timeline_events.map(e => ({...e, iconAndColor: [e.icon, e.frame_color]}))

                        }/> : null}
                    {viewMode === 'timeline' ?
                        <VerticalTimeline
                            id={this.props.basicData.id}
                            style={{background: '#f00'}}>
                            {this.state.timeline_events.map(
                                function (evt) {
                                    return <DataEvent data={evt} url={urlAddress} />
                                })}
                        </VerticalTimeline> : null
                    }
                    <BackTop />

                </div>

            );
        }
    }
}
const mapStateToProps = state => {
  return {
      jwtToken: state.usersReducer.jwtToken,
      storyViewMode: state.sitesReducer.storyViewMode,
      editMode: state.sitesReducer.editMode,
  }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Timeline));
