import React from 'react';
import {Typography} from "antd";

const {Title} = Typography;


export class NoPermissions extends React.Component{

    render() {
        return (
           <div
               style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute', left: '50%', top: '40%',
                  transform: 'translate(-50%, -50%)'

              }}>

        <Title level={1} style={{textAlign:'center'}}>No Permissions to view this story!</Title>
        <Title level={2} style={{textAlign:'center'}}>Ask from the owner.</Title>
            </div>
        )
    }
}
