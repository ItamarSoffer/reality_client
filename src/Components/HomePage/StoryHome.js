import React from 'react';
import {Layout, Divider, message} from "antd";
import LoadingPage from "../LoadingComponent/LoadingPage";
import CardsGrid from '../StoryCard/CardsGrid';
import {connect} from "react-redux";
import {setReRenderCardsAction} from "../../Actions/siteActions";
import {withRouter} from "react-router";
import {getQueryStringParams} from "../../Actions/queryStringActions";
import {apiGetTimelinesByUser} from "../../Actions/apiActions";


class StoryHome extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            timelines: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const queryParams = getQueryStringParams(this.props.history.location.search);
        const searchString = queryParams.search_string? queryParams.search_string: null;
        apiGetTimelinesByUser(this.props.jwtToken, searchString)
            .then((response) => {
                        if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        this.setState({
                            timelines:response.data.results,
                            isLoaded: true});
                    }
                }
            )

    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.cardsRenderCount === 1) {
            this.setState({
                isLoaded: false});
            this.fetchData();
            this.props.setReRenderCards(0);
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return <LoadingPage/>;
        } else
        {
            const creatorPermissions = this.state.timelines.filter(
                function(card_data) {
                    return card_data.role ==='creator'});
            const ownedPermissions = this.state.timelines.filter(
                function(card_data) {
                    return card_data.role ==='owner'});
            const writePermissions = this.state.timelines.filter(
                function(card_data) {
                    return card_data.role ==='write'});
            const readPermissions = this.state.timelines.filter(
                function(card_data) {
                    return card_data.role ==='read'});
            return (
                <div

                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Layout>
                        {
                            creatorPermissions.length === 0? null :
                                <div>
                                    <Divider>Creator</Divider>
                                    <CardsGrid cardsList={creatorPermissions}/>
                                </div>
                        }
                        {
                            ownedPermissions.length === 0? null :
                                <div>
                                    <Divider>Owned</Divider>
                                    <CardsGrid cardsList={ownedPermissions}/>
                                </div>
                        }

                        {
                            writePermissions.length === 0 ? null :
                                <div>
                                    <Divider >Write Permissions</Divider>
                                    <CardsGrid cardsList={writePermissions}/>
                                </div>
                        }
                        {
                            readPermissions.length === 0 ? null :
                                <div>
                                    <Divider >Read Permissions</Divider>
                                    <CardsGrid cardsList={readPermissions}/>
                                </div>
                        }
                        <Divider  orientation="left">
                            Logged as: {this.props.loggedUser}
                        </Divider>
                    </Layout>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,
        cardsRenderCount : state.sitesReducer.cardsRenderCount


    }
};

const mapDispatchToProps = dispatch => {
    return {
        setReRenderCards: (index) => {dispatch(setReRenderCardsAction(index))}

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoryHome));
