import React from 'react';
import {Select, Tag} from "antd";
import {backendAPI} from "../../Structure/api";
import axios from "axios";
import {connect} from "react-redux";

const { Option } = Select;

// non used component
class TagsSelectByName extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            storyTags: [],
        }

    }

    componentWillMount() {
        this.fetchTags();
    }

    fetchTags = () => {
        const addTagApi = backendAPI.concat(`/timeline/${this.props.url}/get_tags`);
        axios.post(addTagApi, {
            jwt_token: this.props.jwtToken,
        }).then(res => res.data)
            .then(data => data.map(e => ({...e, nameAndColor: [e.tag_name, e.tag_color]})))
            .then( (data) => {
                this.setState( {
                    storyTags: data,
                    isLoaded: true
                });
            })
    };
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
                //labelInValue
                defaultValue={defaultValue}
                placeholder={"Tags"}
                style={{width: 300}}
                onChange={value => handleTagChange(value)}
                // onChange={value => console.log(value)}
                mode="multiple"
            >
                {this.state.storyTags.map(
                    function (tagData) {
                        return (
                            <Option value={tagData.tag_name}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TagsSelectByName);
