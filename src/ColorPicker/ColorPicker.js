import React from 'react';
import { red, volcano, orange, gold, yellow, lime, green, cyan, blue,
    geekblue, purple, magenta, grey } from '@ant-design/colors';
import { SwatchesPicker } from 'react-color';

const colorPalette = [
    red.slice(2,-4), volcano.slice(2,-4), orange.slice(2, -4), gold.slice(2,-4), yellow.slice(2,-4),
    green.slice(2,-4), cyan.slice(2,-4), blue.slice(2,-4),
    geekblue.slice(2,-4), purple.slice(2,-4), magenta.slice(2,-4),
    ['#bfbfbf','#595959',
        '#1f1f1f','#000000']
];


class ColorPicker extends React.Component {


  render() {
        const {handleColorChange } = this.props;
    return <SwatchesPicker
        colors={colorPalette}
        width={340}
        height={250}
        onChange={color => handleColorChange(color.hex)}/>;
  }
}

export default ColorPicker;