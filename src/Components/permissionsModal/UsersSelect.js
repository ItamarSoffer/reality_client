import React from 'react';
import {Select} from "antd";
import {connect} from "react-redux";
import {apiGetUsers} from "../../Actions/apiActions";

const { Option } = Select;

class UsersSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            storyUsers: [],
        }

    }

    componentWillMount() {
        this.fetchTags();
    }

    fetchTags = () => {
        apiGetUsers(this.props.jwtToken)
            .then( (data) => {
                this.setState( {
                    storyUsers: data,
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
        const {handleUserChange, } = this.props;

        return (
            <Select
                //labelInValue
                placeholder={"User Select"}
                style={{width: 300}}
                onChange={value => handleUserChange(value)}
                // onChange={value => console.log(value)}
                mode="multiple"
                optionFilterProp='displayName'
                allowClear={true}
            >
                <Option value={'public'} displayName={'Public'}>
                    {'Public'}
                </Option>

                {this.state.storyUsers.map(
                    function (userData) {
                        return (
                            <Option value={userData[0]} displayName={userData[1]}>
                                {userData[1]}
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersSelect);
