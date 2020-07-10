import React from 'react';
import { Typography, Table, ConfigProvider } from 'antd';
import 'react-vertical-timeline-component/style.min.css';
import {connect} from "react-redux";
import {TableIcons} from '../Icons/Icons';


const { Paragraph } = Typography;

function handleText (text){
    return <ConfigProvider direction={"rtl"} >
                <Paragraph ellipsis={{rows: 2, expandable: true}} style={{whiteSpace: "pre-line"}}>
                    {text}
                </Paragraph>
            </ConfigProvider>

}

class StoryTable extends React.Component {
    setColumns() {
        let columns =
            [
                {
                    title: 'Icon',
                    dataIndex: 'iconAndColor',
                    key: 'icon',
                    align: 'center',
                    width: 20,
                    render: iconAndColor => <div style={{
                        color: iconAndColor[1]}}>{TableIcons[iconAndColor[0]]}</div>
        },
        {
            title: 'Time',
            dataIndex: 'event_time',
            key: 'event_time',
            align: 'center',
        },
        {
            title: 'Title',
            dataIndex: 'header',
            key: 'header',
            align: 'center',
            render: text => handleText(text)

        },
        // {
        //     title: 'Adding User',
        //     dataIndex: 'create_user',
        //     key: 'create_user',
        //     align: 'center',
        // },
];
        if (this.props.storyViewMode === 'full_table'){
            columns.push(                {
            title: 'Content',
            dataIndex: 'text',
            key: 'text',
            align: 'center',
                        render: text => handleText(text)

        })
        }
        columns.push({
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: link => <a href={link}>{link}</a>,
            align: 'center',
        });
        return columns

    }

    render() {
        const columns = this.setColumns();
        let expandableConfig = {};
        if (this.props.storyViewMode === 'preview_table'){
            expandableConfig = {
                    expandedRowRender: record => handleText(record.text),
                    rowExpandable: record => record.text !== null && record.text.length > 0,
                }
        }
        else {
            expandableConfig = {}
        }
        return (
            <Table
                dataSource={this.props.timeline_events}
                columns={columns}
                rowKey={record => record.event_id}
                expandable={expandableConfig}
            />
        );
    }
}
const mapStateToProps = state => {
  return {
      storyViewMode: state.sitesReducer.storyViewMode,
  }
};

const mapDispatchToProps = dispatch => {
    return{
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryTable);
