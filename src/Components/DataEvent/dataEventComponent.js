import React from 'react';
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineIcons from '../Icons/Icons'


class DataEvent extends React.Component {

    render() {
        console.log("rendered me");
        return (
            <VerticalTimelineElement
                id={this.props.data.event_id}
            className="vertical-timeline-element--work"
            contentStyle={{
                background: 'rgb(255, 255, 255)',
                color: '#000',
            borderTop: `3px solid ${this.props.data.frame_color}`}}
            contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
            iconStyle={{ background: this.props.data.frame_color, color: '#fff' }}
            icon={TimelineIcons[this.props.data.icon]}

            date={this.props.data.event_time}

          >{this.props.data.header ?
            <h2 className="vertical-timeline-element-title">{this.props.data.header}</h2>: null }
            {this.props.data.text ?
                <p style={{whiteSpace:"pre-line"}}>
                {this.props.data.text}
            </p>: null}
                {this.props.data.link ?
                    <a href={this.props.data.link}>{this.props.data.link}</a>: null}
          </VerticalTimelineElement>

        );
    }
}

export default DataEvent