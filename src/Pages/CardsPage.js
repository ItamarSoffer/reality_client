import React from 'react';
import { withRouter } from "react-router-dom";
import {Layout} from "antd";
import CardsGrid from '../Components/RealityCard/CardsGrid'
import axios from "axios";
import LoadingPage from '../Components/LoadingComponent/LoadingPage';
import SideMenuPage from "./sideMenuPage";
import {backendAPI} from "../Structure/api";
import {connect} from "react-redux";
import {getQueryStringParams} from "../Actions/queryStringActions";
import CardsSearch from "../Components/RealityCard/Search/CardsSearch";
import {setReRenderCardsAction} from "../Actions/siteActions";


class CardsPage extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            timelines: []
        }
    }
    componentWillMount() {
        document.title = "Story: All";
    }

    componentDidMount() {
        this.fetchData()

    }

    fetchData() {
                // console.log(apiGetAllNames);
        const queryParams = getQueryStringParams(this.props.history.location.search);
        const searchString = queryParams.search_string? queryParams.search_string: null;
        const apiGetAllNames = backendAPI.concat("/get_all_names");
        axios.post(apiGetAllNames, {
            "jwt_token": this.props.jwtToken,
            "search_string": searchString
        })
            .then(res => res.data)
            .then((data) => {
                this.setState({
                    timelines:data,
                    isLoaded: true})})
                // .then(() => {console.log("Timelines:", this.state.timelines)});
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
        return (
                <Layout style={{minHeight: '100vh'}}>
                    <SideMenuPage url={this.props.match.params.timeline_url} />

                    <Layout>
                        <br/>
                        <div style={{display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'}}>
                        <CardsSearch/>
                        </div>
                        <br/>
                        {!this.state.isLoaded?
                            <LoadingPage/>:
                        <CardsGrid cardsList={this.state.timelines}/>
                        }
                    </Layout>
                </Layout>
            )
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardsPage));
