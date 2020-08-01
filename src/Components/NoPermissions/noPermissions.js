import React from 'react';
import {Typography, Result} from "antd";
import {
    AiFillCloseCircle
} from "react-icons/ai";


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
               <Result
    icon={<AiFillCloseCircle style={{color: 'red'}} size={150} />}
    title="Ask from the owner."
  />
            </div>
        )
    }
}
