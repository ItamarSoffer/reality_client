import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import {getQueryStringParams} from "../../Actions/queryStringActions";
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
        const queryParams = getQueryStringParams(this.props.history.location.search);
        let defaultPickerQueryValues = null;
        if (queryParams.min_time && queryParams.max_time){
            defaultPickerQueryValues = [moment(queryParams.min_time, "YYYY-MM-DD"), moment(queryParams.max_time, "YYYY-MM-DD")];
        }


        return (
            <RangePicker
      ranges={{
        'Day': [moment(), moment()],
        'Week': [moment().startOf('week'), moment().endOf('week')],
        'Month': [moment().startOf('month'), moment().endOf('month')],
        'Year': [moment().startOf('year'), moment().endOf('year')],
      }}
      onChange={this.onChange}
      defaultValue={defaultPickerQueryValues}

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
