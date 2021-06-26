import React from 'react';
import {Layout, Button} from "antd";
import StoryHome from '../Components/HomePage/StoryHome';

import SideMenuPage from './sideMenuPage';
import {connect} from "react-redux";
import CardsSearch from "../Components/StoryCard/Search/CardsSearch";
import StoryLogo from "../Components/Logo/StoryLogo";
import {controlNewStoryModalAction} from "../Actions/modalsActions";
import NewStoryModal from "../Components/NewStory/NewStoryModal";


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

                        <StoryLogo/>
                        <CardsSearch/>
                        <Button shape="round" onClick={() => this.props.showNewStoryModal()}> New Story</Button>
                        <NewStoryModal/>
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
    return {
        showNewStoryModal: () => {dispatch(controlNewStoryModalAction(true))},

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
