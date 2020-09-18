import React from 'react';
import { red, volcano, orange, gold, yellow, green, cyan, blue,
    geekblue, purple, magenta } from '@ant-design/colors';
import { CirclePicker } from 'react-color';

const colorPalette = [
    '#000000', "#808080", red[5], volcano[5], orange[5], gold[5], yellow[5],
    green[5], cyan[5], blue[5],
    geekblue[5], purple[5], magenta[5],

];


class TagsColorPicker extends React.Component {


    render() {
        const {handleColorChange } = this.props;
        return <CirclePicker
            colors={colorPalette}
            width={450}
            circleSize={20}
            onChange={color => handleColorChange(color.hex)}/>;
    }
}

export default TagsColorPicker;