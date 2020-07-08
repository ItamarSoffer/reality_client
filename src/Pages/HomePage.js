import React from 'react';
import {Layout} from "antd";
import StoryHome from '../Components/HomePage/StoryHome';

import SideMenuPage from './sideMenuPage';
import {connect} from "react-redux";


class HomePage extends  React.Component {
    componentWillMount() {
        // window.location.reload();
    }

    render() {
        return(
        <Layout style={{ minHeight: '100vh' }} >
                  <SideMenuPage url={this.props.match.params.timeline_url} />

                  <Layout>
                      <StoryHome loggedUser={this.props.loggedUser}/>
                  </Layout>
        </Layout>
        )
    }

}


const mapStateToProps = state => {
  return {
      loggedUser: state.usersReducer.loggedUser,
      DarkMode: state.sitesReducer.DarkMode,
      timelineRenderCount : state.sitesReducer.timelineRenderCount

  }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
