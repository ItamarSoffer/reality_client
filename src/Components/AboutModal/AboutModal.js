import React from 'react';
import {message, Typography, Tabs, Drawer, List, ConfigProvider} from "antd";
// import {Input, Form, Input, Button} from "antd";
import {controlAboutsModalAction} from "../../Actions/modalsActions";
import {connect} from "react-redux";
// import {Divider} from "antd/es";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {AboutTableIcons} from "../Icons/Icons";
import FeaturesCollapse from "./FeaturesCollapse";

const {Title, Text} = Typography;
const { TabPane } = Tabs;



class AboutModal extends React.Component{

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
    };

    closeModal = () => {
        this.props.hideAboutModalAction();
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        // console.log(e);
        this.props.hideAboutModalAction();
        this.setState({
            visible: false,
        });
    };

    render(){
        return(
            <Drawer
                title="About"
                visible={this.props.showAboutModal}
                onClose={this.handleCancel}
                placement="right"
                width={500}
            >
                <Tabs tabPosition={'top'} >

                    <TabPane tab="Features" key="3_features">
                        <FeaturesCollapse/>
                    </TabPane>

                    <TabPane tab="Story" key="1_about">
                        <Title level={4} >Story</Title>
                        <ConfigProvider direction={'rtl'}>
                            <Text>
                                סטורי היא מערכת מבוססת אירועים, המיועדת לתיעוד ושימור ידע.
                                ייעודה היא להתממשק עם מרבית מערכות היחידה, על מנת לאפשר ריכוז כלל המידע במערכת אחת.
                                המערכת נכתבה ע"י איתמר סופר ממרכז דאטא

                            </Text>
                        </ConfigProvider>
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


                    <TabPane tab="Contact" key="4_contact">

                        <Title level={4} style={{textAlign: 'center'}}>Contact </Title>
                        - דיווח על בעיה
                        - הרשאות לשותפים
                        - בקשה לפיצ'רים נוספים
                        - בקשת ממשוק עם מערכת
                        - כל דבר אחר
                        מוזמן לפנות:

                    </TabPane>

                    <TabPane tab="Preferences" key="4_preferences">
                        - default color
                        - default icon
                        - extract time or not.
                    </TabPane>

                </Tabs>
            </Drawer>
        )
    }
}

const mapStateToProps = state => {
    return {
        showAboutModal: state.modalsReducer.showAboutModal,
        jwtToken: state.usersReducer.jwtToken,
        editMode: state.sitesReducer.editMode,


    }
};

const mapDispatchToProps = dispatch => {
    return{
        hideAboutModalAction: () => {dispatch(controlAboutsModalAction(false))},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},


    }

};

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);
