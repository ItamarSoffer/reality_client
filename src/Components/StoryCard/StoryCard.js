import React from 'react';
import {Card } from 'antd';
import { Link } from "react-router-dom";
import { Typography, Space, Popover } from 'antd';
import {
    UserOutlined,
    ClockCircleOutlined,
    DeploymentUnitOutlined,
    StarOutlined,
    StarFilled
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
    minHeight: '180px',
    borderRadius: '8px',
    borderColor: "#999999"

    //background: '#0092ff',
};


class StoryCard extends React.Component{
    timeline_url = "/timeline/".concat(this.props.cardData.url);


    render() {

        let name = this.props.cardData.name;
        let titleComponent = null;
        if (name.length > 22){
            name = name.slice(0,20) + '...';
             titleComponent =
                <Popover content={this.props.cardData.name}>
                <Title level={4} style={{color: '#1890ff'}}>{name} </Title>
            </Popover>
        }
        else {
            titleComponent =
                <Title level={4} style={{color: '#1890ff'}}>{name} </Title>
        }

        let favButton = <StarOutlined style={{fontSize: 18}}/>;

        return(

            <div>
                <Card
                    // size="small"
                    bordered={true}
                    style={{...cardStyle}}
                    //         actions={[
                    //   <SettingOutlined key="setting" />,
                    //   <EditOutlined key="edit" />,
                    //   <EllipsisOutlined key="ellipsis" style={{borderRadius: '8px'}}/>,
                    // ]}
                >
                    {/*<br/>*/}
                    <Link to={this.timeline_url}>
                        {titleComponent}
                    </Link>
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
                    {!this.props.cardData.counter ? <div><br/></div>:null}
                    {/*      {! this.props.cardData.hasOwnProperty('role')? null:*/}
                    {/*      <div>*/}

                    {/*<Text >role: {this.props.cardData.role}</Text>*/}
                    {/*      </div>*/}
                    {/*      }*/}
                    <div style={{    textAlign: 'center',}}>
                        {favButton}
                    </div>
                </Card>

            </div>
        )
    }

}

export default StoryCard