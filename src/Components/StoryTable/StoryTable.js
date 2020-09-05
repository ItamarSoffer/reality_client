import React from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import { Typography } from 'antd';
import 'react-vertical-timeline-component/style.min.css';

import axios from 'axios';
import DataEvent from '../DataEvent/dataEventComponent';
import LoadingPage from '../LoadingComponent/LoadingPage';
import {backendAPI} from "../../Structure/api";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
const { Title } = Typography;




<<<<<<< HEAD
class Timeline extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            timeline_events: []
=======
class StoryTable extends React.Component {
      state = {
    searchText: '',
    searchedColumn: '',
  };
    setColumns() {
        let columns =
            [
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
            width: 120,
            align: 'center',
            sorter: (a, b) => Date.parse(a.event_time) - Date.parse(b.event_time),
            // defaultSortOrder: 'descend',

        },
        {
            title: 'Title',
            dataIndex: 'header',
            key: 'header',
            align: 'center',
            render: text => handleText(text),
            ...this.getColumnSearchProps('header'),


        },
        // {
        //     title: 'Adding User',
        //     dataIndex: 'create_user',
        //     key: 'create_user',
        //     align: 'center',
        // },
];
        if (this.props.viewMode === 'full_table'){
            columns.push(                {
            title: 'Content',
            dataIndex: 'text',
            key: 'text',
            align: 'center',
            render: text => handleText(text),
            ...this.getColumnSearchProps('text'),


        })
        }
        columns.push({
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            width: 150,
            render: link => <a href={link}>{link}</a>,
            align: 'center',
        });
        if (this.props.viewMode  === 'full_table'){
        columns.push({
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 170 ,
            render: tags => <TagsRenderer tags={tags}/>,
            align: 'center',
        });
        columns.push(
            {
            title: ' Modify Time',
            dataIndex: 'modify_time',
            key: 'modify_time',
            width: 120,
            align: 'center',
            sorter: (a, b) => Date.parse(a.event_time) - Date.parse(b.event_time),
        }
        )
>>>>>>> 4ce1692... full copy from NH
        }
    }

    fetchData() {
        const TimelineUrl = this.props.url;
        const apiGetEvents = backendAPI.concat(`/timeline/${TimelineUrl}`);
        // console.log(apiGetEvents);
        axios.post(apiGetEvents,
            {
                jwt_token: this.props.jwtToken,
            })
            .then(res => res.data.events)
            .then((evs) => {
                this.setState({
                    timeline_events:evs,
                    isLoaded: true})});
                // .then(() => {console.log("StateEvents:", this.state.timeline_events)});
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.timelineRenderCount === 1) {
            this.fetchData();
            this.props.setReRenderTimeline(0);
        }

    }


    render() {
<<<<<<< HEAD
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
=======
        const columns = this.setColumns();
        let expandableConfig = {};
        const paginationConfig= {
            total: this.props.timeline_events.length,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} מתוך ${total}`
        };
        if (this.props.viewMode === 'preview_table'){
            expandableConfig = {
                    expandedRowRender: record => handleText(record.text),
                    rowExpandable: record => record.text !== null && record.text.length > 0,
                }
>>>>>>> 4ce1692... full copy from NH
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
                    //style={{backgroundColor: '#ccc'}}
                >

                    <Title level={1} style={{textAlign:'center'}}>{this.props.basicData.name}</Title>
                    <Title level={4} style={{textAlign:'center'}}>{this.props.basicData.description}</Title>
                    <VerticalTimeline
                        id={this.props.basicData.id}
                        style={{background: '#f00'}}>
                        {this.state.timeline_events.map(
                            function(evt){
                                return <DataEvent data={evt}  />
                            })}
                    </VerticalTimeline>
                </div>

            );
        }
<<<<<<< HEAD
=======
        return (

            <Table
                dataSource={this.props.timeline_events}
                columns={columns}
                rowKey={record => record.event_id}
                expandable={expandableConfig}
                pagination={paginationConfig}
                style={{
                      // width: '90%',
                      display: 'flex',
                      justifyContent: 'center',
                      // borderRadius: '30px',
                      // borderColor: '#ddd',

                  }}
            />
        );
>>>>>>> 8e9378c... add non exist page
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

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
