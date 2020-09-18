import React from 'react';
import {Divider, List, Typography} from "antd";

const {Text, Title} = Typography;

/*
every object will be:
    - content
    - hotkeys- array of keys
 */

const storyShortcuts = [
    {content: 'Open New Event Window',
        hotKeys: ['Alt', 'N']
    },
    {content: 'Tags Window',
        hotKeys: ['Alt', 'T']
    },
    {content: 'Open Permissions Control',
        hotKeys: ['Alt', 'P']
    },
    {content: 'Enable\\Disable Edit Mode',
        hotKeys: ['Alt', 'C']
    },
    {content: 'Switch Timeline-Table View',
        hotKeys: ['Alt', 'V']
    },
    {content: 'Switch Expand-collapse',
        hotKeys: ['Alt', 'X']
    },
    {content: 'Add New Event',
        hotKeys: ['', '']},
    {content: 'Open Attachments',
        hotKeys: ['Shift', 'Alt', 'X']
    },
];

const generalShortcuts = [
    {content: 'Switch Theme',
        hotKeys: ['Alt', 'A']
    },
    {content: 'Open Help',
        hotKeys: ['Alt', 'H']
    },
    {
        content: 'Open Shortcuts Help',
        hotKeys: [['Alt', 'S'], 'or', ['S', 'C']]
    },
    {content: 'Create New Story',
        hotKeys: ['Shift', 'Alt', 'N']
    },
    {content: 'Jump to Home Screen',
        hotKeys: ['Shift', 'Alt', 'H']
    },
    {content: 'Logout',
        hotKeys: ['Shift', 'Alt', 'L']
    },
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
                        {item.hotKeys.map(function (val) {
                            if (typeof val === 'string') {
                                if (val === 'or') {
                                    return (
                                        <Text>{' '}{val}{' '}</Text>
                                    )
                                } else {
                                    return (
                                        <Text keyboard strong>{val}</Text>
                                    )
                                }
                            }
                            if (Array.isArray(val)) {
                                return (val.map(
                                    innerVal => <Text keyboard strong>{innerVal}</Text>
                                ))

                            }

                        })}
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