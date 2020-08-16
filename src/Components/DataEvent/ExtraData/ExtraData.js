import React from 'react';
import {Button} from "antd";
import YnetExtraData from "./ParseComponents/YnetExtraData";
import DefaultExtraData from "./ParseComponents/DefaultExtraData";

/*
The extra_data (this.prop.data) will contain:
1. Type- which component to pass: tracebook, ynet...
2. color- header color
3. content- dict with relevant data
*/

/*
Each of the Extra Data components will get a data prop that will pass all the things.
 */


class ExtraData extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            visible: !!this.props.startsOpen,
            buttonText: this.props.startsOpen ? 'close': 'Open More'
        }
    }

    handleButtonClick = () => {
        this.setState({
            visible: !this.state.visible,
            buttonText: this.state.visible? 'Open More': "Close",
        });
    };

    render() {
        const showButton = <Button size='small' onClick={this.handleButtonClick}>
                    {this.state.buttonText}
                </Button>;
        let extraDataComponent = <DefaultExtraData data={this.props.data}/>;
        if (this.props.data.type === 'ynet'){
            extraDataComponent = <YnetExtraData data={this.props.data}/>
        }

        return (
            <div>
                {this.state.visible? extraDataComponent: null}
                {showButton}
            </div>
        );


    }
}

export default ExtraData;