import React from 'react';
import SideMenu from '../Components/SideMenu/SideMenu';
import {Layout} from "antd";
import Home from '../HomePage/ReactHome';
import SideMenuPage from './sideMenuPage';


class HomePage extends  React.Component {
    render() {
        return(
        <Layout style={{ minHeight: '100vh' }} >
                  <SideMenuPage url={this.props.match.params.timeline_url} />

                  <Layout>
                      <Home/>
                  </Layout>
        </Layout>
        )
    }

}


export default HomePage