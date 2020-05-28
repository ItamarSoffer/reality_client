import React from 'react';
//import {PongSpinner} from 'react-spinners-kit';
import {RotateSpinner} from 'react-spinners-kit';



class LoadingComponent extends React.Component{

    render() {
        return(
            <RotateSpinner size={80} color={this.props.color} />
        )
    }
}

export default LoadingComponent;