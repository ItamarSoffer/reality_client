import React from 'react';
//import {PongSpinner} from 'react-spinners-kit';
import {RotateSpinner} from 'react-spinners-kit';



class LoadingComponent extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <RotateSpinner size={80} color={this.props.color} />
        )
    }
}

export default LoadingComponent;