import React from 'react';
import SideMenu from '../SideMenu/SideMenu';
import {Layout} from "antd";
import Timeline from '../Timelines/timeline';


class RealityPage extends  React.Component {
    render() {
        return(
        <Layout style={{ minHeight: '100vh' }} >
                          <SideMenu />
                  <Layout>
                      <Timeline url={this.props.match.params.timeline_url} />
                  </Layout>
        </Layout>
        )
    }

}


export default RealityPage