import React from 'react';
import { Input } from 'antd';
import { withRouter } from "react-router-dom";
import {setReRenderTimelineAction} from "../../../Actions/siteActions";
import {connect} from "react-redux";
import {getQueryStringParams} from "../../../Actions/queryStringActions";
import URLSearchParams from "url-search-params";
const { Search } = Input;
class StoryInSearch extends React.Component{

    onSearch =(value) => {
        const pathName = this.props.history.location.pathname;
        let currentSearchQuery = getQueryStringParams(this.props.history.location.search);
        if (value === null || value === ''){
            delete currentSearchQuery['search_string'];
                        this.props.history.push(
                {pathname: pathName,
                    search: "?" + new URLSearchParams(
                        {...currentSearchQuery}
                        ).toString()
            });
        }
        else{
            currentSearchQuery['search_string'] = value;
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
        let defaultQueryValues = null;
        if (queryParams.search_string){
            defaultQueryValues = queryParams.search_string;
        }


        return (
            <Search
                allowClear
                placeholder="search text"
                onSearch={this.onSearch}
                style={{ width: 200 }}
                defaultValue={defaultQueryValues}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoryInSearch));
