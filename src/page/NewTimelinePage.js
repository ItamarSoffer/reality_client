import React from 'react';
import SideMenu from '../SideMenu/SideMenu';
import {Layout} from "antd";
import CreateNewTimeline from '../NewTimeline/NewTimelineComponent';


class NewTimelinePage extends React.Component{
    render() {
        return(
            <Layout style={{ minHeight: '100vh' }} >
                          <SideMenu />
                  <Layout>
                      <CreateNewTimeline/>
                  </Layout>
        </Layout>

        )
    }
}

export default NewTimelinePage