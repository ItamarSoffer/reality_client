import React from 'react';
import {Select} from "antd";
import TimelineIcons from './Icons';

const { Option } = Select;

// non used component
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
        const {handleIconChange } = this.props;

        return(
<Select
    //labelInValue
    placeholder={"icon"}
    style={{ width: 80 }}
    onChange={value => handleIconChange(value)}
  >

                {Object.keys(TimelineIcons).map(
                        function(icon_key){
                            return (
                                <Option value={icon_key}>{TimelineIcons[icon_key]}</Option>
                            )
                        }
                    )}
  </Select>
        )
    }
}

export default IconsSelect