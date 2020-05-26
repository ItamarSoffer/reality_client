import React from 'react';
import {Select} from "antd";
import TimelineIcons from './Icons';

const { Option } = Select;


class IconsSelect extends React.Component {
    handleChange(value) {
  console.log(value); // { key: "lucy", label: "Lucy (101)" }
}
    onChange(value) {
  console.log(`selected ${value}`);
}

onBlur() {
  console.log('blur');
}

onFocus() {
  console.log('focus');
}

onSearch(val) {
  console.log('search:', val);
}

    render() {

        return(
<Select
    labelInValue
    placeholder={"icon"}
    style={{ width: 80 }}
    onChange={this.handleChange}
  >

                {Object.keys(TimelineIcons).map(
                        function(key){
                            return (
                                <Option value={key}>{TimelineIcons[key]}</Option>
                            )
                        }
                    )}
  </Select>
        )
    }
}

export default IconsSelect