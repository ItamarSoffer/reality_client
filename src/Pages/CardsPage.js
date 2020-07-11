import React from 'react';
import {Layout} from "antd";
import CardsGrid from '../Components/RealityCard/CardsGrid'
import axios from "axios";
import LoadingPage from '../Components/LoadingComponent/LoadingPage';
import SideMenuPage from "./sideMenuPage";
import {backendAPI} from "../Structure/api";
import {connect} from "react-redux";


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

        // console.log(apiGetAllNames);
        const apiGetAllNames = backendAPI.concat("/get_all_names");
        axios.post(apiGetAllNames, {
            "jwt_token": this.props.jwtToken
        })
            .then(res => res.data)
            .then((data) => {
                this.setState({
                    timelines:data,
                    isLoaded: true})})
                // .then(() => {console.log("Timelines:", this.state.timelines)});
    }


    render() {
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        }
        else {
            return (
                <Layout style={{minHeight: '100vh'}}>
                    <SideMenuPage url={this.props.match.params.timeline_url} />

                    <Layout>
                        <CardsGrid cardsList={this.state.timelines}/>
                    </Layout>
                </Layout>
            )
        }
    }

}

const mapStateToProps = state => {
  return {
      jwtToken: state.usersReducer.jwtToken,

  }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
