import React from 'react';
import {Layout, Divider} from "antd";
import axois from 'axios';
import {backendAPI} from "../../Structure/api";
import LoadingPage from "../LoadingComponent/LoadingPage";
import CardsGrid from '../RealityCard/CardsGrid';






class StoryHome extends  React.Component {
        constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            timelines: []
        }
    }

    componentDidMount() {
        const apiGetTimelines = backendAPI.concat(`/get_timelines_by_user?username=${this.props.loggedUser}`);
        axois.get(apiGetTimelines)
            .then(res => res.data)
            .then( (data) => {
                this.setState({
                    timelines: data,
                    isLoaded: true
                }) }
            )

    }

    render() {
        if (!this.state.isLoaded) {
            return <LoadingPage/>;
        } else
            {
                const ownedPermissions = this.state.timelines.filter(
                    function(card_data) {
                        return card_data.role ==='owner'});
                const writePermissions = this.state.timelines.filter(
                    function(card_data) {
                        return card_data.role ==='write'});
                const readPermissions = this.state.timelines.filter(
                    function(card_data) {
                        return card_data.role ==='read'});
            return (
                <div

                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Layout>
                        {
                            ownedPermissions.length === 0? null :
                            <div>
                                    <Divider>Owned</Divider>
                                    <CardsGrid cardsList={ownedPermissions}/>
                            </div>
                        }

                        {
                            writePermissions.length === 0 ? null :
                            <div>
                                    <Divider >Write Permissions</Divider>
                                    <CardsGrid cardsList={writePermissions}/>
                            </div>
                        }
                        {
                            readPermissions.length === 0 ? null :
                            <div>
                    <Divider >Read Permissions</Divider>
                    <CardsGrid cardsList={readPermissions}/>
                            </div>
                        }
                        <Divider  orientation="left">
                                    Logged as: {this.props.loggedUser}
                                </Divider>
                    </Layout>
                </div>
            );
        }
    }
}
export default StoryHome;
