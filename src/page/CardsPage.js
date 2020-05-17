import React from 'react';
import SideMenu from '../SideMenu/SideMenu';
import {Layout} from "antd";
import CardsGrid from '../RealityCard/CardsGrid'
import axios from "axios";


const base_timelines_url = "http://itsoffer:5005/api/get_all_names";

class CardsPage extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            timelines: []
        }
    }

    componentDidMount() {
        console.log(base_timelines_url);
        axios.get(base_timelines_url)
            .then(res => res.data)
            .then((data) => {
                this.setState({
                    timelines:data,
                    isLoaded: true})})
                .then(() => {console.log("Timelines:", this.state.timelines)});
    }


    render() {
        return(
        <Layout style={{ minHeight: '100vh' }} >
                          <SideMenu />
                  <Layout>
                      <CardsGrid cardsList={this.state.timelines}/>
                  </Layout>
        </Layout>
        )
    }

}


export default CardsPage