import React from 'react';
import SideMenu from '../Components/SideMenu/SideMenu';
import {Layout} from "antd";
import CreateNewTimeline from '../Components/NewTimeline/NewTimelineComponent';
import SideMenuPage from "./sideMenuPage";
import {connect} from "react-redux";


class NewTimelinePage extends React.Component{
    render() {
                console.log("props", this.props);
        return(
            <Layout style={{ minHeight: '100vh' }} >
                <SideMenuPage url={this.props.match.params.timeline_url} />
                  <Layout>
                      <CreateNewTimeline loggedUser={this.props.loggedUser}/>
                  </Layout>
        </Layout>

        )
    }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.usersReducer.loggedUser
  }
};

const mapDispatchToProps = disaptch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(NewTimelinePage);
