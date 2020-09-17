import React from 'react';
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {TimelineIcons} from '../Icons/Icons';
import { Typography, ConfigProvider } from 'antd';
import EventEditOptions from "./EventEditOptions";
import {connect} from "react-redux";
import TagsRenderer from '../Tags/TagsRenderer'
import ExtraData from "./ExtraData/ExtraData";
import LinkView from "./LinkView";


const { Paragraph, Title } = Typography;


class DataEvent extends React.Component {
    render() {
        return (
            <ConfigProvider direction={"rtl"} >
                <VerticalTimelineElement
                    key={this.props.data.event_id}
                    className="vertical-timeline-element--work"
                    contentStyle={{
                        background: this.props.darkMode? 'rgb(40,40,40)':'rgb(255, 255, 255)',
                        color: '#000',
                        borderTop: `3px solid ${this.props.data.frame_color}`}}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
                    iconStyle={{ background: this.props.data.frame_color, color: '#fff' }}
                    icon={TimelineIcons[this.props.data.icon]}

                    date={<Typography.Text>{this.props.data.event_time}</Typography.Text>}

                >

                    {!this.props.data.header ? null : <Title level={3}>{this.props.data.header}</Title> }

                    {this.props.expandMode?
                        <div>
                            {!this.props.data.text ? null :
                                <Paragraph ellipsis={{rows: 3, expandable: true}} style={{whiteSpace: "pre-line"}}>
                                    {this.props.data.text}
                                </Paragraph>}
                            {!this.props.data.link ? null :

                                    <LinkView link={this.props.data.link}/>

                                }
                            {this.props.data.tags.length > 0 ? <TagsRenderer tags={this.props.data.tags}/> : null}
                            {this.props.data.extra_data?
                                <div>
                                    <br/>
                                    <ExtraData key={"extra_".concat(this.props.data.event_id)} data={this.props.data.extra_data}/>
                                </div>
                                : null}
                            {!this.props.editMode? null:
                                <div>
                                    <br/>
                                    <EventEditOptions
                                        key={"menu_".concat(this.props.data.event_id)}
                                        data={this.props.data}
                                        eventId={this.props.data.event_id}
                                        url={this.props.url}
                                    />
                                </div>
                            }
                        </div>
                        : null
                    }


                </VerticalTimelineElement>
            </ConfigProvider>

        );
    }
}
const mapStateToProps = state => {
    return {
        editMode: state.sitesReducer.editMode,
        loggedUser : state.usersReducer.loggedUser,
        darkMode: state.sitesReducer.darkMode

    }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(DataEvent);

