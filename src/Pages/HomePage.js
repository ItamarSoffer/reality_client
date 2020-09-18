import React from 'react';
import {Layout} from "antd";
import StoryHome from '../Components/HomePage/StoryHome';

import SideMenuPage from './sideMenuPage';
import {connect} from "react-redux";
import CardsSearch from "../Components/StoryCard/Search/CardsSearch";


class HomePage extends  React.Component {
    componentWillMount() {
        document.title = "Story: Home";

        // window.location.reload();
    }

    render() {
        return(
            <Layout style={{ minHeight: '100vh' }} >
                <SideMenuPage url={this.props.match.params.timeline_url} />

                <Layout>
                    <br/>
                    <div style={{display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                        <CardsSearch/>
                    </div>
                    <br/>
                    <StoryHome loggedUser={this.props.loggedUser}/>
                </Layout>
            </Layout>
        )
    }

}


const mapStateToProps = state => {
    return {
        loggedUser: state.usersReducer.loggedUser,
        darkMode: state.sitesReducer.darkMode,
        timelineRenderCount : state.sitesReducer.timelineRenderCount

    }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
