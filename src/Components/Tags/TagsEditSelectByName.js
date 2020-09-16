import React from 'react';
import {Select, Tag} from "antd";
import {connect} from "react-redux";

const { Option } = Select;

// non used component
class TagsEditSelectByName extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            storyTags: [],
        }

    }


    handleChange(value) {
        // console.log(value); // { key: "lucy", label: "Lucy (101)" }
    }
    onChange(value) {
        // console.log(`selected ${value}`);
    }

    onBlur() {
        console.log('blur');
    }

    onFocus() {
        console.log('focus');
    }

    onSearch(val) {
        // console.log('search:', val);
    };
    render() {
        const {handleTagChange, defaultValue, } = this.props;

        return (
            <Select
                // labelInValue
                defaultValue={defaultValue}
                placeholder={"Tags"}
                style={{width: 200}}
                onChange={value => handleTagChange(value)}
                optionFilterProp='displayName'
                // mode="multiple"

            >
                {this.props.tags.map(
                    function (tagData) {
                        return (
                            <Option value={tagData.tag_id} displayName={tagData.tag_name}>
                                <Tag
                                    // closable
                                    color={tagData.tag_color} id={tagData.tag_id}>
                                    {tagData.tag_name}
                                </Tag>
                            </Option>)
                    }
                )}
            </Select>
        )

    }
};

const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,

    }
};

const mapDispatchToProps = dispatch => {
    return{
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(TagsEditSelectByName);
