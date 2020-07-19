import React from 'react';
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {TimelineIcons} from '../Icons/Icons';
import { Typography, ConfigProvider } from 'antd';
import EventDropdown from "./eventDropdown";
import {connect} from "react-redux";
import TagsRenderer from '../Tags/TagsRenderer'


const { Paragraph, Title } = Typography;


class DataEvent extends React.Component {

    render() {
        return (
            <ConfigProvider direction={"rtl"} >
            <VerticalTimelineElement
                key={this.props.data.event_id}
            className="vertical-timeline-element--work"
            contentStyle={{
                background: 'rgb(255, 255, 255)',
                color: '#000',
            borderTop: `3px solid ${this.props.data.frame_color}`}}
            contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
            iconStyle={{ background: this.props.data.frame_color, color: '#fff' }}
            icon={TimelineIcons[this.props.data.icon]}

            date={this.props.data.event_time}

          >

                {!this.props.data.header ? null : <Title level={3}>{this.props.data.header}</Title> }
            {!this.props.data.text ? null :
                <Paragraph ellipsis={{rows: 3, expandable: true}} style={{whiteSpace: "pre-line"}}>
                    {this.props.data.text}
                </Paragraph>}
                {!this.props.data.link ? null :
                    <div><a href={this.props.data.link}>{this.props.data.link}</a> <br/></div>}
                {this.props.data.tags.length > 0 ? <TagsRenderer tags={this.props.data.tags}/> : null}
                {!this.props.editMode? null:
                    <EventDropdown
                        key={"menu_".concat(this.props.data.event_id)}
                        data={this.props.data}
                        eventId={this.props.data.event_id}
                                   loggedUser={this.props.loggedUser}
                                   selectedTags={this.props.data.tags}
                                   url={this.props.url}
                    />}

          </VerticalTimelineElement>
            </ConfigProvider>

        );
    }
}
const mapStateToProps = state => {
  return {
      editMode: state.sitesReducer.editMode,
      loggedUser : state.usersReducer.loggedUser

  }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(DataEvent);

