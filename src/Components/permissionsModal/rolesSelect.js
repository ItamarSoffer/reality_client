import React from "react";
import {Select} from "antd";

const { Option } = Select;

class RolesSelect extends React.Component{
    render() {
        const {handleRoleChange } = this.props;

        return(
                <Select
                    placeholder={"Role"}
                    style={{ width: 80 }}
                    onChange={value => handleRoleChange(value)}
                  >
                    <Option value={"read"}>Read</Option>
                    <Option value={"write"}>Write</Option>
                    <Option style={{color:'red'}} value={"none"}>Remove</Option>
                  </Select>
                        )
                    }

};
export default  RolesSelect