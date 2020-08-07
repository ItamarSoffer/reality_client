import React from 'react';
import {Tag, Badge} from "antd";
import {connect} from "react-redux";


class TagsRenderer extends React.Component{
    onTagClose = (tagData) => {
        this.props.handleTagClose(tagData.tag_id);
    };

    renderTag = tagData => {
      if (this.props.deletable && this.props.editMode) {
          return (
              <Tag
                  color={tagData.tag_color}
                  id={tagData.tag_id}
                  closable={true}
                  onClose={() => {this.onTagClose(tagData)}}>
                  {tagData.tag_name}
              </Tag>
          )
      }
      else {
          return (
              <Tag color={tagData.tag_color} id={tagData.tag_id}>
                                {tagData.tag_name}
                            </Tag>
          )
      }
    };


    render() {
        if (this.props.withBadge) {
         return (
            <div>
           {this.props.tags.map(
                        function(tagData){
                            return (
                            <Badge count={tagData.counter}>
                                <Tag color={tagData.tag_color} id={tagData.tag_id}>
                                {tagData.tag_name}
                            </Tag>
                            </Badge>

                            )
                        }
                    )}
            </div>

        )
        }
        else {

        return (
            <div>
           {this.props.tags.map(tagData => this.renderTag(tagData))}
            </div>

        )
        }
    }
}

const mapStateToProps = state => {
  return {
      editMode: state.sitesReducer.editMode,

  }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(TagsRenderer);