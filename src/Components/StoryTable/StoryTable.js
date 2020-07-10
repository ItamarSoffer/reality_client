import React from 'react';
// import { VerticalTimeline }  from 'react-vertical-timeline-component';
// import DataEvent from '../DataEvent/dataEventComponent';
import { Typography, Table, ConfigProvider } from 'antd';
import 'react-vertical-timeline-component/style.min.css';
import axios from 'axios';
import LoadingPage from '../LoadingComponent/LoadingPage';
import {backendAPI} from "../../Structure/api";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import {TableIcons} from '../Icons/Icons';


const { Title, Text, Paragraph } = Typography;

function handleText (text){
    return <ConfigProvider direction={"rtl"} >
                <Paragraph ellipsis={{rows: 2, expandable: true}} style={{whiteSpace: "pre-line"}}>
                    {text}
                </Paragraph>
            </ConfigProvider>

}

class StoryTable extends React.Component {
    columns = [
                {
                    title: 'Icon',
                    dataIndex: 'iconAndColor',
                    key: 'icon',
                    align: 'center',
                    width: 20,
                    render: iconAndColor => <div style={{
                        color: iconAndColor[1]}}>{TableIcons[iconAndColor[0]]}</div>

        },
        {
            title: 'Time',
            dataIndex: 'event_time',
            key: 'event_time',
            align: 'center',

        },
        {
            title: 'Title',
            dataIndex: 'header',
            key: 'header',
            align: 'center',
            render: text => <ConfigProvider direction={"rtl"} >
                <Text>
                    {text}
                </Text>
            </ConfigProvider>

        },
        {
            title: 'Content',
            dataIndex: 'text',
            key: 'text',
            align: 'center',
                        render: text => handleText(text)

        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: link => <a href={link}>{link}</a>,
            align: 'center',
        },
        // {
        //     title: 'Adding User',
        //     dataIndex: 'create_user',
        //     key: 'create_user',
        //     align: 'center',
        // },
];

        // the same
    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            timeline_events: []
        }
    }

        // the same
    fetchData() {
        const TimelineUrl = this.props.url;
        const apiGetEvents = backendAPI.concat(`/timeline/${TimelineUrl}`);
        // console.log(apiGetEvents);
        axios.post(apiGetEvents,
            {
                jwt_token: this.props.jwtToken,
            })
            .then(res => res.data.events)
            .then(events => events.map(e => ({...e, iconAndColor: [e.icon, e.frame_color]})))
            .then((evs) => {
                this.setState({
                    timeline_events:evs,
                    isLoaded: true})});

                // .then(() => {console.log("StateEvents:", this.state.timeline_events)});
    }

        // same
    componentDidMount() {
        this.fetchData();
    }

        // same
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.timelineRenderCount === 1) {
            this.fetchData();
            this.props.setReRenderTimeline(0);
        }

    }


    render() {
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        }
        else if (this.state.timeline_events.length === 0){
            return (
                <div>

                <Title level={1} style={{textAlign:'center'}}>{this.props.url}</Title>
                <Title level={2} style={{textAlign:'center'}}>Empty! Start add some events.</Title>

                </div>
            )
        }
        else
            {
                //returns the timeline.
            return (
                <div
                >

                    <Title level={1} style={{textAlign:'center'}}>{this.props.basicData.name}</Title>
                    <Title level={4} style={{textAlign:'center'}}>{this.props.basicData.description}</Title>
                    <Table
                        dataSource={this.state.timeline_events}
                        columns={this.columns}
                        rowKey={record => record.event_id}
                        expandable={{
                            expandedRowRender: record => handleText(record.text),
                            rowExpandable: record => record.text.length >0 ,
                        }}
                    />

                </div>

            );
        }
    }
}
const mapStateToProps = state => {
  return {
      jwtToken: state.usersReducer.jwtToken,
  }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryTable);
