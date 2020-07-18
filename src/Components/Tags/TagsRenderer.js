import React from 'react';
import {Tag} from "antd";


class TagsRenderer extends React.Component{


    render() {
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
export default TagsRenderer;