import React from 'react';
import SideMenu from '../SideMenu/SideMenu';
import {Layout} from "antd";
import Home from '../HomePage/ReactHome'


class HomePage extends  React.Component {
    render() {
        return(
        <Layout style={{ minHeight: '100vh' }} >
                          <SideMenu />
                  <Layout>
                      <Home/>
                  </Layout>
        </Layout>
        )
    }

}


export default HomePage