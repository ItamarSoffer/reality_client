import React from 'react';
import SideMenu from '../Components/SideMenu/SideMenu';
import {Layout} from "antd";
import Timeline from '../Components/Timelines/timeline';
import CreateNewEvent from '../Components/NewEvent/NewEventComponent';

class RealityPage extends  React.Component {
    render() {
        return(
        <Layout style={{ minHeight: '100vh' }} >
                          <SideMenu url={this.props.match.params.timeline_url} />
                  <Layout>
                      <CreateNewEvent url={this.props.match.params.timeline_url} />
                      <Timeline url={this.props.match.params.timeline_url} />
                  </Layout>
        </Layout>
        )
    }

}


export default RealityPage