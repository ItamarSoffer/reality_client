import React from 'react';
<<<<<<< HEAD:src/Components/RealityCard/CardsGrid.js
import { Col, Row } from 'antd';
import RealityCard from './RealityCard';
=======
import { List } from 'antd';
import StoryCard from './StoryCard';
import {connect} from "react-redux";
>>>>>>> 5b098b5... completely added favorites:src/Components/StoryCard/CardsGrid.js


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
const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {


    }

};

export default connect(mapStateToProps, mapDispatchToProps)(cardsGrid);