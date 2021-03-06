import React from 'react';
import {Collapse,Typography, Tag, List} from "antd";
import {
    StarFilled,
} from '@ant-design/icons';
const {Panel} = Collapse;
const {Paragraph, Text} = Typography;
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

function handleEnText (text){
    return <Paragraph style={{whiteSpace: "pre-line"}}>
        {text}
    </Paragraph>

}

class FeaturesCollapse extends React.Component {
    integrations = [
        {
            systemName: 'Ynet',
            iconPath:'./images/logos/YnetLogo.png',
        },
        {
            systemName: 'Ynet',
            iconPath:'./images/logos/YnetLogo.png',
        },
        {
            systemName: 'Story',
            iconPath:'./images/logos/StoryIcon.svg',
        },
        {
            systemName: 'iframe',
            iconPath:'./images/logos/iframeLogo.png',
        },
        {
            systemName: 'Splunk- via iframe',
            iconPath:'./images/logos/SplunkLogo.jpg',
        },
    ];


    render() {
        const starFilled = <StarFilled
            style={{
                fontSize: 25,
                color: '#fadb14',
            }}/>;

        return (
            <div>
            <Collapse
                defaultActiveKey={[1, 2, 3, 4, 5, 6, 7, 8]}
            >
                <Panel header="What is Story" key={1}>
                    <div style={{textAlign:"center"}}>
                    <Text strong style={{fontSize: 16} }>Story is an events based system for documenting and preserving knowledge.</Text>
                    </div>

                        <Paragraph style={{whiteSpace: "pre-line"}}>
                            {`Every story is built from events: click on the "Add" button to add a new one. 
                            Each event includes the following parameters: title, date, time, link, content, icon, color and tags. 
                            Enabling `} <Text strong>Edit Mode</Text>{` will open "edit" and "delete" buttons for each event.`}
                        </Paragraph>

                        <img src={require('./images/logos/StoryIcon.svg')} alt={'storyIcon.svg'} width={'120px'}/>

                </Panel>
                <Panel header="Tags" key={2}>
                    <Paragraph style={{whiteSpace: "pre-line"}}>
                    {`Tags are used as keywords for allowing quick searching and filtering.
                    Story lets you:
                    1. `} <Text strong>Create</Text>{`: choose keyword and color.
                    2. `} <Text strong>Add</Text>{`: attach the tag to the relevant events.
                    3. `} <Text strong>Edit</Text>{`: change the tag's text or color, and it will update everywhere.
                    4. `} <Text strong>Delete</Text>{`: remove the tag from all events.
                    
                   # Tags are not shareable between stories.`}
                    </Paragraph>
                    <Tag color={'#2f54eb'} key={'example_1'} closable>
                        תגית
                    </Tag>
                    <Tag color={'#f5222d'} key={'example_2'} closable>
                        גורלי
                    </Tag>
                    <Tag color={'#722ed1'} key={'example_3'} closable>
                        מרגש
                    </Tag>

                </Panel>
                <Panel header="Filters" key={3}>

                    <Paragraph style={{whiteSpace: "pre-line"}}>
                        {`Story Lets you filter events by the following parameters:
                    1. `} <Text strong>Time</Text>{`: select a Time range of the events.
                    2. `} <Text strong>Text</Text>{`: searches in title, content and link.
                    3. `} <Text strong>Tags</Text>{`: matches all the events with al least one of the selected tags.
                    Filter will be saved in the URL for coping and sharing.
                    `}
                    </Paragraph>

                    <img src={require('./images/StoryFilters.png')} alt={'StoryFilters.png'} width={280} height={124}/>
                    <br/>
                    <Text strong>Tip: Use _ as wildcard!</Text>
                </Panel>
                <Panel header="Permissions" key={4}>
                    <Paragraph style={{whiteSpace: "pre-line"}}>
                        {`Each story has an inner permission control.
                        There are 4 permission levels:
                        1. `}<Text strong>Read</Text>{`: can only read the story.
                        2. `} <Text strong> Write</Text>{`: can read and edit story.
                        3. `} <Text strong>Owner</Text>{`:  can write and add permissions to other users.
                        4. `} <Text strong>Creator</Text>{`: the user who created the story. These permissions can not be given by a user.
                    `}
                    </Paragraph>
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
                <Panel header="Modes & Views" key={5}

                >
                    <Collapse defaultActiveKey={[5.1, 5.2]}>
                        <Panel header="Modes" key={5.1}>
                            <Paragraph style={{whiteSpace: "pre-line"}}>
                                {`Story presents your events in two classic modes:
                                1. `}
                                <Text strong>Timeline Mode</Text>
                                {`: Watch the events one by one, by the order they occur.
                                2. `} <Text strong>Table Mode</Text>
                                {`: Like the classic M.D. table- but much better.

                                Switch between modes in the View menu.`}

                            </Paragraph>

                        </Panel>
                        <Panel header="Views" key={5.2}>
                            <Paragraph style={{whiteSpace: "pre-line"}}>
                                {`Display the content in two ways:
                                1. `}
                                <Text strong>Expand</Text>
                                {`: All the content of the events, in a spacious display.
                                2. `} <Text strong>Compress</Text>
                                {`: Summary of the events, watch more events in the same window.

                                Switch between displays in the View menu.`}

                            </Paragraph>
                        </Panel>

                    </Collapse>
                </Panel>
                <Panel header="Import & Export" key={6}>
                    <Paragraph style={{whiteSpace: "pre-line"}}>
                        <Text strong>Import from Excel</Text>
                        {`: Upload your table to Story and keep working online.
                                `} <Text strong>Export to Excel</Text>
                        {`: Download your work to excel file.
                        
                        Check out these functions in the More Menu.`}
                    </Paragraph>

                </Panel>
                <Panel header="Integrations" key={7}>
                    {
                        handleEnText(`In our vision, Story will integrate with many of the unit's systems.
                        The systems that integrate with us today:`)
                    }
                    <List
                        itemLayout="horizontal"
                        dataSource={this.integrations}
                        renderItem={item => (
                            <List.Item>
                                <img src={require(`${item.iconPath}`)} alt={`${item.iconPath}`} width={'40px'} height={'40px'}/>
                                {'  '}
                                <Text strong >{item.systemName}</Text>
                            </List.Item>

                        )}
                    />
                </Panel>
                <Panel header="Favorites" key={8}>
                    {handleEnText(`Story lets you choose your favorites stories, and creates shortcut for quick access!
                    Favorite stories will appear on the left at any time.`)}
                    <div style={{alignItems: 'center'}}>

                        {starFilled}
                        {starFilled}
                        {starFilled}
                        {starFilled}
                        {starFilled}
                    </div>

                    <br/>

                    <img src={require('./images/Favorites.png')}  alt={'Favorites.png'} height={'50%'} width={'50%'}/>

                </Panel>

            </Collapse>
                <br/>
                <Text>Writen by Itamar Soffer.</Text>
                </div>
        )

    }
}

export default  FeaturesCollapse