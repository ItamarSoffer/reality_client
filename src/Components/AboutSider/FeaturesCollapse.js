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

            <Collapse
                defaultActiveKey={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
            >
                <Panel header="What is Story" key={0} >
                    <Text strong>Story is an Event based system for documentation and preserving knowledge.</Text>
                    {handleEnText(` Each story should contains all the events that are related to the subject.
                        One of its purposes is to interface with most of the unit's systems, in order to allow all the information to be concentrated in one system.
                        
                        Story is writen by Itamar Soffer from Data.`)}
                        <img src={require('./images/logos/StoryIcon.svg')} alt={'storyIcon.svg'} width={'120px'}/>
                </Panel>
                <Panel header="Basics" key={1}>
                    {
                        handleEnText(
                            `Each story is built from events.
                            After creating a new story, clicking on the "Add Event" will open the the relevant modal.
                            An event includes the following parameters: Title, date, time, link, content, icon, color and tags. 
                            The events are editable and deletable- by enabling Edit Mode the buttons will appear. `
                        )
                    }

                </Panel>
                <Panel header="Tags" key={2}>
                    {handleEnText(`Tags makes our life much easier. 
                    We use tags as keywords for quick searching and filtering. Story lets you preform the following actions:
                    1. Create: choose keyword and color.
                    2. Add: add the tag to the relevant events.
                    3. Edit: change the tag's text or color, and it will update everywhere.
                    4. Delete: remove the tag from all events.
                    
                    All of this is in the Edit menu -> tags. 
                   # Tags are not shareable between stories.`)}
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
                    {handleEnText(
                        `Story Lets you to filter by the following parameters:
                    1. Time: Select a Time range of the events.
                    2. Text: Searches in title, content and link.
                    3. Tags: Matches all the events with al least one of the selected tags.
                    The filter will be saved in the URL, so it can be copied.
                    `)}

                    <img src={require('./images/StoryFilters.png')} alt={'StoryFilters.png'} width={280} height={124}/>
                    <br/>
                    <Text strong>Tip: Use _ as wildcard!</Text>
                </Panel>
                <Panel header="Permissions" key={4}>
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
                <Panel header="Modes & Views" key={5}

                >
                    <Collapse defaultActiveKey={[5.1, 5.2]}>
                        <Panel header="Modes" key={5.1}>
                            <Paragraph style={{whiteSpace: "pre-line"}}>
                                {`Story presents your events in two classic modes:
                                1.`}
                                <Text strong>Timeline Mode</Text>
                                {`: Watch the events one by one, by the order they occur.
                                2.`} <Text strong>Table Mode</Text>
                                {`: Like the classic M.D. table- but much better.

                                Switch between modes in the View menu.`}

                            </Paragraph>

                        </Panel>
                        <Panel header="Views" key={5.2}>
                            <Paragraph style={{whiteSpace: "pre-line"}}>
                                {`For every mode, You can display the content in two ways:
                                1.`}
                                <Text strong>Expanded</Text>
                                {`: All the content of the events, in a spacious display.
                                2.`} <Text strong>Compressed</Text>
                                {`: Summarize of the events, watch more events in the same window.

                                Switch between displays in the View menu.`}

                            </Paragraph>
                            {handleEnText()}
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
                        The current system integrates with us:`)
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
                    You can add any story to favorites, regardless to your permissions, and it will appear on the left at any time. `)}
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
        )

    }
}

export default  FeaturesCollapse