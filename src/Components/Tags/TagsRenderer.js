import React from 'react';
import {Tag, Badge} from "antd";


class TagsRenderer extends React.Component{


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
           {this.props.tags.map(
                        function(tagData){
                            return (<Tag color={tagData.tag_color} id={tagData.tag_id}>
                                {tagData.tag_name}
                            </Tag>)
                        }
                    )}
            </div>

        )
        }
    }
}
export default TagsRenderer;