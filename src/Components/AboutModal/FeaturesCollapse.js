import React from 'react';
import {Collapse, ConfigProvider,Typography, Image, Tag} from "antd";

const {Panel} = Collapse;
const {Paragraph} = Typography;
/*

                        - פתיחת ציר
                        - הוספת אירועים
                        - תגיות
                        - הרשאות
                        - מצבי צפייה
                        - ייצוא
                        - ייבוא
                        - אינטגרציות
                        - דברים שכתבתי במייל

 */

function handleHebText (text){
    return <ConfigProvider direction={"rtl"} >
        <Paragraph style={{whiteSpace: "pre-line"}}>
            {text}
        </Paragraph>
    </ConfigProvider>

}

function handleEnText (text){
    return <Paragraph style={{whiteSpace: "pre-line"}}>
            {text}
        </Paragraph>

}

class FeaturesCollapse extends React.Component {

    render() {
        const text = '1111';
        return (

            <Collapse defaultActiveKey={['1', '2', '3', '8']}>
                <Panel header="What is Story" key="0" >
                    כל החפירה שכתבתי
                </Panel>
                <Panel header="Basics" key="1">
                    {
                        handleEnText(
                            "- Create story\n" +
                            "                    - add events\n" +
                            "                    - editing\n" +
                            "                    V- EDITING OPTIONS IMAGE"
                        )
                    }

                    <Image src={require('./images/EditOptions.png')} width={120}/>
                </Panel>
                <Panel header="Tags" key="2">
                    <p>{text}</p>
                    - create tags
                    - add to events
                    - edit tags
                    - delete tags
                    V - TAGS IMAGE
                    <Image src={require('./images/TagsClosable.png')} width={200}/>


                </Panel>
                <Panel header="Filters" key="3">
                    {handleEnText(
                    `Story Lets you to filter by the following parameters:
                    1. Time: Select a Time range of the events.
                    2. Text: Searches in title, content and link.
                    3. Tags: Matches all the events with al least one of the selected tags.
                    The filter will be saved in the URL, so it can be copied.
                    `)}

                    <Image src={require('./images/StoryFilters.png')} width={215} height={95}/>
                </Panel>
                <Panel header="Permissions" key="4">
                    {handleEnText(
                        `Each story has an inner permission control.
                        There are 4 permission roles:
                        1. Read: Only read the story, can not edit.
                        2. Write: Read + Edit story.
                        3. Owner:  Write + add permissions to other users. Can delete the whole story. 
                        4. Creator: The user who created the story. These permissions can not be given by a user.
                    `)}
                      <Tag color={'geekblue'} key={'read'}>
                            {'READ'}
                        </Tag>
                    <Tag color={'volcano'} key={'write'}>
                            {'WRITE'}
                        </Tag>
                    <Tag color={'red'} key={'owner'}>
                            {'OWNER'}
                        </Tag>
                    <Tag color={'black'} key={'creator'}>
                            {'CREATOR'}
                        </Tag>

                </Panel>
                <Panel header="Modes & Views" key="5">
                    <Collapse defaultActiveKey="5_1">
                        <Panel header="Modes" key="5_1">
                            - Timeline view
                            - table view
                        </Panel>
                        <Panel header="Views" key="5_2">
                            - expand
                            - compress
                        </Panel>
                    </Collapse>
                </Panel>
                <Panel header="Import & Export" key="6">
                    - Import xlsx
                    - Export xlsx
                    - example table?
                    - import and export options IMAGE
                    <p>{text}</p>
                </Panel>
                <Panel header="Integrations" key="7">
                    <p>{text}</p>
                    - הסבר שיהיו כל מיני אינטגרציות
                    - קיימות: INTELITEM
                </Panel>
                <Panel header="Favorites" key="8">
                    - Adding to favorites
                    - view in side.
                    <p>{text}</p>
                    - favorites image
                    <Image src={require('./images/Favorites.png')}/>
                </Panel>
            </Collapse>
        )

    }
}

export default  FeaturesCollapse