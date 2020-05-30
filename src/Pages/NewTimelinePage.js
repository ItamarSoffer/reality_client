import React from 'react';
import SideMenu from '../Components/SideMenu/SideMenu';
import {Layout} from "antd";
import CreateNewTimeline from '../Components/NewTimeline/NewTimelineComponent';
import SideMenuPage from "./sideMenuPage";


class NewTimelinePage extends React.Component{
    render() {
        return(
            <Layout style={{ minHeight: '100vh' }} >
                                                    <SideMenuPage url={this.props.match.params.timeline_url} />

                  <Layout>
                      <CreateNewTimeline/>
                  </Layout>
        </Layout>

        )
    }
}

export default NewTimelinePage