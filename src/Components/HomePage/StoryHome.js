import React from 'react';
import {Layout, Divider} from "antd";
import axios from 'axios';
import {backendAPI} from "../../Structure/api";
import LoadingPage from "../LoadingComponent/LoadingPage";
import CardsGrid from '../RealityCard/CardsGrid';
import {connect} from "react-redux";


class StoryHome extends  React.Component {
        constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            timelines: []
        }
    }

    componentDidMount() {
<<<<<<< HEAD
        const apiGetTimelines = backendAPI.concat(`/get_timelines_by_user`);
        axios.post(apiGetTimelines,
            {
                jwt_token: this.props.jwtToken,
            })
            .then(res => res.data)
            .then( (data) => {
                this.setState({
                    timelines: data,
                    isLoaded: true
                }) }
=======
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
>>>>>>> 8a372ee... add, edit and del event dont fetch all
            )

    }

    render() {
        if (!this.state.isLoaded) {
            return <LoadingPage/>;
        } else
            {
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

  }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryHome);
