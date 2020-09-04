import React from 'react';
import { List } from 'antd';
import StoryCard from './StoryCard';
import {connect} from "react-redux";


/*
This component will get a list of cards, and arrange them in a grid format
*/
class cardsGrid extends React.Component{


    render(){
        return(
            <div>
                <List
                    grid={{gutter: 24, column: 4}}
                    dataSource={this.props.cardsList}
                    renderItem={
                        card_data => (
                            <List.Item>
                                <StoryCard cardData={card_data}/>
                            </List.Item>
                        )
                    }
                />
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