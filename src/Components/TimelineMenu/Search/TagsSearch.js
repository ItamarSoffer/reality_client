import React from 'react';
import { withRouter } from "react-router-dom";
import {setReRenderTimelineAction} from "../../../Actions/siteActions";
import {connect} from "react-redux";
import {getQueryStringParams} from "../../../Actions/queryStringActions";
import URLSearchParams from "url-search-params";
import TagsSelectByName from "../../Tags/TagsSelectByName";


class TagsSearch extends React.Component{

    onSearch = (value) => {
        const pathName = this.props.history.location.pathname;
        let currentSearchQuery = getQueryStringParams(this.props.history.location.search);
        if (value === null || value === ''){
            delete currentSearchQuery['tags'];
            this.props.history.push(
                {pathname: pathName,
                    search: "?" + new URLSearchParams(
                        {...currentSearchQuery}
                        ).toString()
            });
        }
        else{
            currentSearchQuery['tags'] = value;
            this.props.history.push(
                {pathname: pathName,
                    search: "?" + new URLSearchParams(
                        {...currentSearchQuery}
                        ).toString()

            });
        }
  this.props.setReRenderTimeline(1);
    };

    onTagsChange = (newTags) => {
      this.setState({
          tags: newTags
      })
  };


    render(){
        const pathName = this.props.history.location.pathname;
        const urlAddress = pathName.slice(pathName.indexOf("/", 1) + 1);
        const queryParams = getQueryStringParams(this.props.history.location.search);
        let defaultQueryValues = null;
        if (queryParams.tags){
            defaultQueryValues = queryParams.tags.split(",");
        }


        return (
            <TagsSelectByName
                url={urlAddress}
                allowClear={true}
                onSearch={this.onSearch}
                defaultValue={defaultQueryValues}
                handleTagChange={this.onSearch}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TagsSearch));
