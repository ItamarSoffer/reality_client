import React from 'react';
import {Card, Col, Menu, Row} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
/*
The Reality card will get a data as prop with the the following things:
- name
- url
- id
- create user
 */

const cardData = {
    "name": "my test- ציר זמן ראשון",
    "url": "base",
    "id": "2525",
    "create_user":"itamar"
};

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
                     <h2 style={{color: '#1890ff'}}>{this.props.cardData.name} </h2></Link>
      <p>Card content</p>
      <p>Card content</p>
      <p>Created by: {this.props.cardData.create_user}</p>
        </Card>

</div>
        )
    }

}

export default RealityCard