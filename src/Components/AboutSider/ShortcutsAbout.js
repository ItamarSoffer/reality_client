import React from 'react';
import {Typography, Divider, List} from "antd";

const {Text, Title} = Typography;

/*
every object will be:
    - content
    - hotkeys- array of keys
 */

const storyShortcuts = [
    {content: 'Open New Event Window',
        hotKeys: ['Alt', 'n']},
    {content: 'Tags Window',
        hotKeys: ['Alt', 't']},
    {content: 'Open Permissions Control',
        hotKeys: ['Alt', 'p']},
    {content: 'Enable\\Disable Edit Mode',
        hotKeys: ['Alt', 'c']},
    {content: 'Switch Timeline-Table View',
        hotKeys: ['Alt', 'v']},
    {content: 'Switch Expand-collapse',
        hotKeys: ['Alt', 'x']},
    {content: 'Add New Event',
        hotKeys: ['', '']},
    {content: 'Open Attachments',
        hotKeys: ['Shift', 'Alt', 'x']},
];

const generalShortcuts = [
    {content: 'Switch Theme',
        hotKeys: ['Alt', 'a']},
    {content: 'Open Help',
        hotKeys: ['Alt', 'h']},
    {content: 'Create New Story',
        hotKeys: ['Shift', 'Alt', 'n']},
    {content: 'Jump to Home Screen',
        hotKeys: ['Shift', 'Alt', 'h']},
    {content: 'Logout',
        hotKeys: ['Shift', 'Alt', 'l']},
];


const generateShortcutsList =(shortcutsList, title) => {
    return (
        <div>
            <Divider><Title level={4}>{title}</Title></Divider>
            <List
                split={false}
                dataSource={shortcutsList}
                renderItem={item => (
                    <List.Item>
                        <Text strong>{item.content} </Text>{' '}
                        {item.hotKeys.map(val => <Text keyboard>{val}</Text>)}
                    </List.Item>
                )}
            />
        </div>
    )
};


class ShortcutsAbout extends React.Component {
    render() {
        return (
            <div>
                {generateShortcutsList(generalShortcuts, "General Shortcuts")}
                {generateShortcutsList(storyShortcuts, "In Story Shortcuts")}





            </div>

        )
    }

}
export default ShortcutsAbout