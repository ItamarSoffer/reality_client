import React from 'react';
import { Col, Row } from 'antd';
import RealityCard from './RealityCard';


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
                                <RealityCard cardData={card_data}/>
                            </Col>)
                        }
                    )}
                </Row>
            </div>
        )
    }

}

export default cardsGrid