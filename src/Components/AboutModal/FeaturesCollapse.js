import React from 'react';
import {Collapse} from "antd";

const {Panel} = Collapse;
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

class FeaturesCollapse extends React.Component {

    render() {
        const text = '1111';
        return (
            <Collapse>
                <Panel header="What is Story" key="0">
                    כל החפירה שכתבתי
                </Panel>
                <Panel header="Basics" key="1">
                    - Create story
                    - add events
                    - editing
                </Panel>
                <Panel header="Tags" key="2">
                    <p>{text}</p>
                    - create tags
                    - add to events
                    - edit tags
                    - delete tags

                </Panel>
                <Panel header="Filters" key="3">
                    <p>{text}</p>
                    - filter by text
                    - filter by time
                    - filter by tags
                    - saved in url
                </Panel>
                <Panel header="Permissions" key="4">
                    <p>{text}</p>
                    - permissions levels
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
                </Panel>
            </Collapse>
        )

    }
}

export default  FeaturesCollapse