import React from 'react';
import {Card } from 'antd';
import { Link } from "react-router-dom";
import { Typography } from 'antd';

const { Title, Text } = Typography;
/*
The Reality card will get a data as prop with the the following things:
- name
- url
- id
- create user
 */

const cardStyle = {
            //height: '120px',
  fontSize: '14px',
     textAlign: 'center',
  //lineHeight: '20px',
    minHeight: '130px',

  //background: '#0092ff',
  borderRadius: '8px',
        };


class RealityCard extends React.Component{
     timeline_url = "/timeline/".concat(this.props.cardData.url);


    render() {

        return(
            <div>
        <Card

              bordered={true}
              style={cardStyle}
          //     actions={[
          //   <SettingOutlined key="setting" />,
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" style={{borderRadius: '8px'}}/>,
          // ]}
        >
				<Link to={this.timeline_url}>
                     <Title level={4} style={{color: '#1890ff'}}>{this.props.cardData.name} </Title>
				</Link>
            {!this.props.cardData.description ? null :
                <div>
                <Text strong style={{color: '#222'}}>{this.props.cardData.description}</Text>
                < br />
                </div>
            }
      <Text >Created by: {this.props.cardData.create_user}</Text>
        </Card>

</div>
        )
    }

}

export default RealityCard