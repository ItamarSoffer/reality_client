import React from 'react';
import {Typography, Table, ConfigProvider, Button, Space, Input} from 'antd';
import 'react-vertical-timeline-component/style.min.css';
import {connect} from "react-redux";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {TableIcons, FilterTableIcons} from '../Icons/Icons';
import TagsRenderer from '../Tags/TagsRenderer';
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import EventEditOptions from "../DataEvent/EventEditOptions";
import ExtraData from "../DataEvent/ExtraData/ExtraData";
import {getUniqValues} from "../../Actions/eventsActions";
import LinkView from "../DataEvent/LinkView";

const { Paragraph } = Typography;

function handleText (text){
    return <ConfigProvider direction={"rtl"} >
        <Paragraph style={{whiteSpace: "pre-line"}}>
            {text}
        </Paragraph>
    </ConfigProvider>

}

class StoryTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };


    setColumns() {
        let columns =
            [
                {
                    title: 'Icon',
                    dataIndex: 'iconAndColor',
                    key: 'icon',
                    align: 'center',
                    width: 20,
                    filters: getUniqValues(this.props.timeline_events, 'icon').map(
                        function(icon_key){
                            return (
                                {text: FilterTableIcons[icon_key], value: icon_key}
                            )
                        }
                    ),
                    onFilter: (value, record) =>
                        record['icon'] === null ? false: record['icon'].toString().toLowerCase().includes(value.toLowerCase()),
                    render: iconAndColor => <div style={{
                        color: iconAndColor[1]}}>{TableIcons[iconAndColor[0]]}</div>,
                },
                {
                    title: 'Time',
                    dataIndex: 'event_time',
                    key: 'event_time',
                    width: 120,
                    align: 'center',
                    sorter: (a, b) => Date.parse(a.event_time) - Date.parse(b.event_time),
                    // defaultSortOrder: 'descend',

                },
                {
                    title: 'Title',
                    dataIndex: 'header',
                    key: 'header',
                    align: 'center',
                    render: text => handleText(text),
                    ...this.getColumnSearchProps('header'),


                },
                // {
                //     title: 'Adding User',
                //     dataIndex: 'create_user',
                //     key: 'create_user',
                //     align: 'center',
                // },
            ];
        if (this.props.expandMode){
            columns.push(                {
                title: 'Content',
                dataIndex: 'text',
                key: 'text',
                width: 280,
                align: 'center',
                render: text => handleText(text),
                ...this.getColumnSearchProps('text'),


            })
        }
        columns.push({
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            width: 150,
            ...this.getColumnSearchProps('link'),
            render: link => <LinkView link={link}/>,
            align: 'center',

        });
        if (this.props.expandMode){
            columns.push({
                title: 'Tags',
                dataIndex: 'tags',
                key: 'tags',
                width: 170 ,
                render: tags => <TagsRenderer tags={tags}/>,
                align: 'center',
            });
            columns.push(
                {
                    title: ' Modified Time',
                    dataIndex: 'modify_time',
                    key: 'modify_time',
                    width: 120,
                    align: 'center',
                    sorter: (a, b) => Date.parse(a.modify_time) - Date.parse(b.modify_time),
                }
            )
        }
        if (this.props.editMode){
            columns.push({
                title: 'Actions',
                key: 'actions',
                width: 150 ,
                align: ' center',
                render: (_, record)=>
                    <div>
                        <EventEditOptions
                            key={"t_menu_".concat(record.event_id)}
                            data={record}
                            eventId={record.event_id}
                            url={this.props.url}
                        />

                    </div>

            });
        }
        return columns
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] === null ? false: record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ?
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
                :
                handleText(text)
        ,
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = this.setColumns();
        let expandableConfig = {};
        const paginationConfig= {
            total: this.props.timeline_events.length,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} מתוך ${total}`
        };
        expandableConfig = {};
        if (!this.props.expandMode){
            expandableConfig = {
                expandedRowRender: record =>
                    <div>
                        {handleText(record.text)}
                        {record.extra_data?
                            <div>
                                <br/>
                                <ExtraData key={"t_extra_".concat(record.event_id)} data={record.extra_data}/>
                            </div>
                            : null}

                    </div>,
                rowExpandable: record => (record.text !== null && record.text.length > 0) || record.extra_data
            }
        }
        else {
            expandableConfig = {
                expandedRowRender: record =>
                    <div>
                        {record.extra_data?
                            <div>
                                <br/>
                                <ExtraData key={"t_extra_".concat(record.event_id)} data={record.extra_data} startsOpen/>
                            </div>
                            : null}

                    </div>,
                rowExpandable: record => (record.extra_data && true)
            }
        }
        return (
            <ConfigProvider direction='rtl'>
                <Table
                    dataSource={this.props.timeline_events}
                    columns={columns}
                    rowKey={record => record.event_id}
                    expandable={expandableConfig}
                    pagination={paginationConfig}
                    style={{
                        // width: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        // borderRadius: '30px',
                        // borderColor: '#ddd',

                    }}
                />
            </ConfigProvider>
        );
    }
}
const mapStateToProps = state => {
    return {
        editMode: state.sitesReducer.editMode,
        jwtToken: state.usersReducer.jwtToken,


    }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryTable);
