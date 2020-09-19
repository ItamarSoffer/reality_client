import React from 'react';
import {Select} from "antd";
import {TimelineIcons} from './Icons';

const { Option } = Select;

// non used component
class IconsSelect extends React.Component {
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
    }

    render() {
        const {handleIconChange, defaultValue}  = this.props;

        return(
            <Select
                //labelInValue
                allowClear
                showSearch
                defaultValue={defaultValue}
                placeholder={"icon"}
                style={{ width: 120 }}
                onChange={value => handleIconChange(value)}
                filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >

                {Object.keys(TimelineIcons).sort().map(
                    function(icon_key){
                        return (
                            <Option value={icon_key}>
                                {TimelineIcons[icon_key]}
                            </Option>
                        )
                    }
                )}
            </Select>
        )
    }
}

export default IconsSelect