import React from 'react';
import {Result} from "antd";



export class NotExists extends React.Component{

    render() {
        return (
           <div
               style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute', left: '50%', top: '40%',
                  transform: 'translate(-50%, -50%)'

              }}>
               <Result
    title="This page does not exists!"

  />
            </div>
        )
    }
}
