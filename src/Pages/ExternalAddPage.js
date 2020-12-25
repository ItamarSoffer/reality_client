import React from 'react';
import {Layout, Typography} from "antd";

import SideMenuPage from './sideMenuPage';
import {connect} from "react-redux";
import StoryLogo from "../Components/Logo/StoryLogo";
import ExternalAddEvent from "../Components/ExternalAddEvent/ExternalAddEvent";
import RichTextEditor from "../Components/RichTextEditor/RichTextEditor";

const {Title} = Typography;


class ExternalAddPage extends  React.Component {
    componentWillMount() {
        document.title = "Story: Home";

        // window.location.reload();
    }

    render() {
        return(
            <Layout style={{ minHeight: '100vh' }} >
                <SideMenuPage url={this.props.match.params.timeline_url} />

                <Layout>
                    <br/>
                    <div style={{display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: '40%',
                    }}>
                    {/*<Title level={2}>External Add</Title>*/}
                        <StoryLogo size={'80%'}/>
                    </div>
                    <br/>
                    {/*<ExternalAddEvent key={'ext_event'}/>*/}
                    <RichTextEditor/>
                </Layout>
            </Layout>
        )
    }

}


const mapStateToProps = state => {
    return {
        loggedUser: state.usersReducer.loggedUser,
        darkMode: state.sitesReducer.darkMode,
        timelineRenderCount : state.sitesReducer.timelineRenderCount

    }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalAddPage);
