import React from 'react';
import {Card, message} from 'antd';
import { Link } from "react-router-dom";
<<<<<<< HEAD:src/Components/RealityCard/RealityCard.js
import { Typography } from 'antd';
=======
import { Typography, Space, Popover } from 'antd';
import {
    UserOutlined,
    ClockCircleOutlined,
    DeploymentUnitOutlined,
    StarOutlined,
    StarFilled,
    StarTwoTone
} from '@ant-design/icons';
import {apiAddFavorites, apiDellFavorites} from "../../Actions/apiActions";
import {connect} from "react-redux";
import {setReRenderFavorites} from "../../Actions/favoritesActions";
>>>>>>> 5b098b5... completely added favorites:src/Components/StoryCard/StoryCard.js

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

    handleAddFavorite = () => {
        apiAddFavorites(this.props.jwtToken, this.props.cardData.url)
            .then((response) => {
                    if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        message.success(response.data, 1.5);
                        this.props.rerenderFavorites();
                    }
                }
            )
    };

    handleRemoveFavorite = () => {
        apiDellFavorites(this.props.jwtToken, this.props.cardData.url)
            .then((response) => {
                    if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        message.success(response.data, 1.5);
                        this.props.rerenderFavorites();
                    }
                }
            )
    };


    render() {

<<<<<<< HEAD:src/Components/RealityCard/RealityCard.js
=======
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

        let favButton =null;
        if (this.props.favoritesIds.indexOf(this.props.cardData.id) !== -1){
            favButton =
                <Popover content={<Text style={{color: 'red'}}>Remove</Text>}>
                <StarFilled
                    style={{
                        fontSize: 20,
                        color: '#fadb14',
                        borderWidth: 'thin',
                    }}

                             onClick={() => this.handleRemoveFavorite()}
                />
                </Popover>;
        }
        else {
            favButton =
                <Popover content={<Text>Add</Text>}>
                <StarOutlined style={{fontSize: 20}}
                             // twoToneColor="#01a9b4"
                             onClick={() => this.handleAddFavorite()}
                />
            </Popover>;
        }


>>>>>>> 5b098b5... completely added favorites:src/Components/StoryCard/StoryCard.js
        return(
            <div>
<<<<<<< HEAD:src/Components/RealityCard/RealityCard.js
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
=======
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
>>>>>>> 5b098b5... completely added favorites:src/Components/StoryCard/StoryCard.js
        )
    }

}

<<<<<<< HEAD:src/Components/RealityCard/RealityCard.js
export default RealityCard
=======
const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,
        favoritesIds: state.favoritesReducer.favorites.map( (fav) => (fav.story_id))

    }
};

const mapDispatchToProps = dispatch => {
    return {
        rerenderFavorites: () => {dispatch(setReRenderFavorites(true))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryCard);
>>>>>>> 5b098b5... completely added favorites:src/Components/StoryCard/StoryCard.js
