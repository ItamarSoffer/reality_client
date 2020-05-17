import React from 'react';
import SideMenu from '../SideMenu/SideMenu';
import {Layout} from "antd";
import CardsGrid from '../RealityCard/CardsGrid'

const cardsData =[
    {"name": "my test- ציר זמן ראשון",
    "url": "base",
    "id": "2525",
    "create_user":"itamar"},
        {"name": "my test- ציר זמן שני- החיים ",
    "url": "soffer",
    "id": "2305",
    "create_user":"itamar"},

];
class CardsPage extends  React.Component {
    render() {
        return(
        <Layout style={{ minHeight: '100vh' }} >
                          <SideMenu />
                  <Layout>
                      <CardsGrid cardsList={cardsData}/>
                  </Layout>
        </Layout>
        )
    }

}


export default CardsPage