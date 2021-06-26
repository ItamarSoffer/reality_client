import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import {setReRenderTimelineAction} from "../../../Actions/siteActions";
import {connect} from "react-redux";
import {getQueryStringParams} from "../../../Actions/queryStringActions";
import URLSearchParams from 'url-search-params';
const { RangePicker } = DatePicker;

class StoryRangePicker extends React.Component{

    onChange = (dates, dateStrings) => {
        const pathName = this.props.history.location.pathname;
        let currentSearchQuery = getQueryStringParams(this.props.history.location.search);
        if (dates === null){
            delete currentSearchQuery['min_time'];
            delete currentSearchQuery['max_time'];
            this.props.history.push(
                {pathname: pathName,
                    search: "?" + new URLSearchParams(
                        {...currentSearchQuery}
                    ).toString()
                });
        }
        else{
            currentSearchQuery['min_time'] = dateStrings[0];
            currentSearchQuery['max_time'] = dateStrings[1];
            this.props.history.push(
                {pathname: pathName,
                    search: "?" + new URLSearchParams(
                        {...currentSearchQuery}
                    ).toString()

                });
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
