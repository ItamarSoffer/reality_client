import React from 'react';
import SideMenu from '../Components/SideMenu/SideMenu';
import {Layout} from "antd";
import Timeline from '../Components/Timelines/timeline';
import CreateNewEvent from '../Components/NewEvent/NewEventComponent';
import TimelineMenu from "../Components/TimelineMenu/TimelineMenu";
import SideMenuPage from './sideMenuPage'
import {connect} from "react-redux";


class RealityPage extends  React.Component {
    render() {
        return(
        <Layout
            style={{ minHeight: '100vh' }}
        >
                          <SideMenuPage url={this.props.match.params.timeline_url} />
                  <Layout>
                      <TimelineMenu url={this.props.match.params.timeline_url}
                      loggedUser={this.props.loggedUser}/>
                      <Timeline url={this.props.match.params.timeline_url} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RealityPage);

