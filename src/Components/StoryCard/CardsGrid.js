import React from 'react';
import { Col, Row } from 'antd';
import StoryCard from './StoryCard';


/*
This component will get a list of cards, and arrange them in a grid format
*/
class cardsGrid extends React.Component{


    render(){

        return(
            <div>
                <Row gutter={[24, 24]}>
                    {this.props.cardsList.map(
                        function(card_data){
                            return (<Col span={8}>
                                <StoryCard cardData={card_data}/>
                            </Col>)
                        }
                    )}
                </Row>
            </div>
        )
    }

}

export default cardsGrid