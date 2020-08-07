import React from 'react';
import {Card } from 'antd';
import { Link } from "react-router-dom";
import { Typography, Space } from 'antd';
import {
    UserOutlined,
    ClockCircleOutlined,
    DeploymentUnitOutlined
} from '@ant-design/icons';

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
  // lineHeight: '20px',
    minHeight: '160px',
    borderRadius: '8px',
    borderColor: "#999999"

  //background: '#0092ff',
        };


class StoryCard extends React.Component{
     timeline_url = "/timeline/".concat(this.props.cardData.url);


    render() {

        return(
            <div>
        <Card

              bordered={true}
              style={{...cardStyle}}
          //     actions={[
          //   <SettingOutlined key="setting" />,
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" style={{borderRadius: '8px'}}/>,
          // ]}
        >
				<Link to={this.timeline_url}>
                     <Title level={4} style={{color: '#1890ff'}}>{this.props.cardData.name} </Title>
				</Link>
            {/*{!this.props.cardData.description ? null :*/}
            {/*    <div>*/}
            {/*    <Text strong style={{color: '#222'}}>{this.props.cardData.description}</Text>*/}
            {/*    < br />*/}
            {/*    </div>*/}
            {/*}*/}
            {!this.props.cardData.counter ? null :
                <div>
                    <Space>
                    <DeploymentUnitOutlined/>
                    {this.props.cardData.counter === 1 ?

                        <Text style={{color: '#222'}}>{this.props.cardData.counter} Event</Text> :
                        <Text style={{color: '#222'}}>{this.props.cardData.counter} Events</Text>
                    }
                    </Space>
                < br />
                </div>
            }
            <Space>
                <UserOutlined/>
            <Text style={{color: '#222'}}>{this.props.cardData.create_user}</Text>
            </Space>
            <br/>
            <Space>
                <ClockCircleOutlined/>
                <Text style={{color: '#222'}}>{this.props.cardData.last_modify}</Text>
            </Space>
      {/*      {! this.props.cardData.hasOwnProperty('role')? null:*/}
      {/*      <div>*/}

      {/*<Text >role: {this.props.cardData.role}</Text>*/}
      {/*      </div>*/}
      {/*      }*/}
        </Card>

</div>
        )
    }

}

export default StoryCard