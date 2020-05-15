import React from 'react';
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


{/*
the props.data will contain:
- background: 'rgb(33, 150, 243)'
- date
- iconBackground
- iconColor
- icon:
- h3
- h4
- p

 more will later.
*/}
class DataEvent extends React.Component {

    render() {
        console.log("rendered me");
        return (
            <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: this.props.data.background, color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date={this.props.data.date}
            iconStyle={{ background: this.props.data.iconBackground, color: this.props.data.iconColor }}
            icon={this.props.data.icon}

          >
            <h3 className="vertical-timeline-element-title">this.props.data.h3</h3>
            <h4 className="vertical-timeline-element-subtitle">this.props.data.h4</h4>
            <p>
              this.props.data.p
            </p>
          </VerticalTimelineElement>

        );
    }
}

export default DataEvent