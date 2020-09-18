import LoadingComponent from "./LoadingComponent";
import React from "react";

class LoadingPage extends React.Component{

    render(){
        return (
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>

                <LoadingComponent color={'#8A0CDC'}/>
            </div>

        )
    }

};

export default LoadingPage
