import React from 'react';
import SideMenu from '../Components/SideMenu/SideMenu';
import {Layout} from "antd";
import CardsGrid from '../Components/RealityCard/CardsGrid'
import axios from "axios";
import LoadingPage from '../Components/LoadingComponent/LoadingPage';
import SideMenuPage from "./sideMenuPage";



const base_timelines_url = "http://localhost:5005/api/get_all_names";

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
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        }
        else {
            return (
                <Layout style={{minHeight: '100vh'}}>
                    <SideMenuPage url={this.props.match.params.timeline_url} />

                    <Layout>
                        <CardsGrid cardsList={this.state.timelines}/>
                    </Layout>
                </Layout>
            )
        }
    }

}


export default CardsPage