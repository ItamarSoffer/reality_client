import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";

const { RangePicker } = DatePicker;

class StoryRangePicker extends React.Component{

    onChange = (dates, dateStrings) => {
  const pathName = this.props.history.location.pathname;
        if (dates === null){
            this.props.history.push(pathName);
        }
        else{

  // console.log('From: ', dates[0], ', to: ', dates[1]);
  // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  this.props.history.push(pathName.concat(`?min_time=${dateStrings[0]}&max_time=${dateStrings[1]}`));
        }
  this.props.setReRenderTimeline(1);
    };

    render(){
        return (
            <RangePicker
      ranges={{
        Today: [moment(), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
      }}
      onChange={this.onChange}
    />

        )
    }
}
const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoryRangePicker));
