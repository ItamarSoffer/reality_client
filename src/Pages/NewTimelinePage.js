import React from 'react';
import SideMenu from '../Components/SideMenu/SideMenu';
import {Layout} from "antd";
import CreateNewTimeline from '../Components/NewTimeline/NewTimelineComponent';


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