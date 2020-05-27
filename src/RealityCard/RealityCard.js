import React from 'react';
import {Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
/*
The Reality card will get a data as prop with the the following things:
- name
- url
- id
- create user
 */


class RealityCard extends React.Component{
     timeline_url = "/timeline/".concat(this.props.cardData.url);


    render() {

        return(
            <div>
        <Card
              bordered={true}
              style={{
            //height: '120px',
  fontSize: '14px',
  //lineHeight: '120px',
  //background: '#0092ff',
  borderRadius: '8px',
        }}
              actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" style={{borderRadius: '8px'}}/>,
          ]}>
				<Link to={this.timeline_url}>
                     <h2 style={{color: '#1890ff'}}>{this.props.cardData.name} </h2>
				</Link>
            <h4>{this.props.cardData.description}</h4>
      <p>Created by: {this.props.cardData.create_user}</p>
        </Card>

</div>
        )
    }

}

export default RealityCard