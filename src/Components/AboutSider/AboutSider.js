import React from 'react';
import {message, Typography, Tabs, Drawer, List, } from "antd";
import {controlAboutSiderAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {AboutTableIcons} from "../Icons/Icons";
import FeaturesCollapse from "./FeaturesCollapse";
import ShortcutsAbout from "./ShortcutsAbout";

const {Text} = Typography;
const { TabPane } = Tabs;



class AboutSider extends React.Component{

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
    };

    closeModal = () => {
        this.props.hideAboutSiderAction();
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        // console.log(e);
        this.props.hideAboutSiderAction();
        this.setState({
            visible: false,
        });
    };

    render(){
        return(
            <Drawer
                title="About"
                visible={this.props.showAboutSider}
                onClose={this.handleCancel}
                placement="right"
                width={500}
            >
                <Tabs tabPosition={'top'} >

                    <TabPane tab="Features" key="1_features">
                        <FeaturesCollapse/>
                    </TabPane>

                    <TabPane tab="Icons" key="2_icons">
                        <Text> This are the available icons in Story.
                            You can use the names when uploading XLSX file.
                            If you want a specific icon- request for it.
                        </Text>

                        <List
                            size="small"
                            bordered
                            dataSource={Object.keys(AboutTableIcons)}
                            renderItem = {item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={AboutTableIcons[item]}
                                        title={item}
                                    />
                                </List.Item>
                            )}/>

                    </TabPane>

                     <TabPane tab="Shortcuts" key="3_shortcuts">

                        <ShortcutsAbout/>
                    </TabPane>


                    {/*<TabPane tab="Contact" key="3_contact">*/}

                    {/*    <Title level={4} style={{textAlign: 'center'}}>Contact </Title>*/}
                    {/*    - דיווח על בעיה*/}
                    {/*    - הרשאות לשותפים*/}
                    {/*    - בקשה לפיצ'רים נוספים*/}
                    {/*    - בקשת ממשוק עם מערכת*/}
                    {/*    - כל דבר אחר*/}
                    {/*    מוזמן לפנות:*/}

                    {/*</TabPane>*/}

                    {/*<TabPane tab="Preferences" key="4_preferences">*/}
                    {/*    - default color*/}
                    {/*    - default icon*/}
                    {/*    - extract time or not.*/}
                    {/*</TabPane>*/}

                </Tabs>
            </Drawer>
        )
    }
}

const mapStateToProps = state => {
    return {
        showAboutSider: state.modalsReducer.showAboutSider,
        jwtToken: state.usersReducer.jwtToken,
        editMode: state.sitesReducer.editMode,


    }
};

const mapDispatchToProps = dispatch => {
    return{
        hideAboutSiderAction: () => {dispatch(controlAboutSiderAction(false))},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},


    }

};

export default connect(mapStateToProps, mapDispatchToProps)(AboutSider);
