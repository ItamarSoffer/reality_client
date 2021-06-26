import React from 'react';
import {Layout} from "antd";
import CreateNewStory from '../Components/NewStory/NewStoryComponent';
import SideMenuPage from "./sideMenuPage";
import {connect} from "react-redux";
import CreateNewEvent from "../Components/NewEvent/NewEventComponent";


class NewStoryPage extends React.Component{
    componentDidMount() {

        document.title = "New Story";
    }
    render() {
        return(
            <Layout style={{ minHeight: '100vh' }} >
                <SideMenuPage url={this.props.match.params.timeline_url} />
                <Layout>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            left: '50%', top: '40%',
                            transform: 'translate(-50%, -50%)'

                        }}>
                        <CreateNewStory loggedUser={this.props.loggedUser}/>
                    </div>
                </Layout>
            </Layout>

        )
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.usersReducer.loggedUser,
        darkMode: state.sitesReducer.darkMode,

    }
};

const mapDispatchToProps = disaptch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(NewStoryPage);



