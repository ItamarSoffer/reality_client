import React from 'react';
import {Typography, Table, ConfigProvider, Button, Space, Input, message} from 'antd';
import 'react-vertical-timeline-component/style.min.css';
import {connect} from "react-redux";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {TableIcons} from '../Icons/Icons';
import TagsRenderer from '../Tags/TagsRenderer';
import {showEditEventModalAction} from "../../Actions/modalsActions";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {backendAPI} from "../../Structure/api";
import axios from "axios";
import EditEvent from "../NewEvent/EditEvent";

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
                    render: iconAndColor => <div style={{
                        color: iconAndColor[1]}}>{TableIcons[iconAndColor[0]]}</div>
        },
        {
            title: 'Time',
            dataIndex: 'event_time',
            key: 'event_time',
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
        if (this.props.viewMode === 'full_table'){
            columns.push(                {
            title: 'Content',
            dataIndex: 'text',
            key: 'text',
            align: 'center',
            render: text => handleText(text),
            ...this.getColumnSearchProps('text'),


        })
        }
        columns.push({
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: link => <a href={link}>{link}</a>,
            align: 'center',
        });
        if (this.props.viewMode  === 'full_table'){
        columns.push({
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 170 ,
            render: tags => <TagsRenderer tags={tags}/>,
            align: 'center',
        });
        }
        if (this.props.editMode){
           columns.push({
            title: 'Actions',
            key: 'actions',
            width: 150 ,
            align: ' center',
            render: (_, record)=><div>
                <Space>
                <Button size={"small"}
                        onClick={() => this.props.showEditEventModal(record.event_id)}
                        // onClick={() => {console.log("edit", record)}}
                > Edit</Button>
                <Button danger size={"small"}
                        onClick={() => this.handleDelete(record.event_id)}
                    // onClick={() => {console.log("DEL", record)}}
                > Delete</Button>
                </Space>
                <EditEvent
                    key={record.event_id}
                    eventData={record}
                    eventId={record.event_id}
                    url={this.props.url}

                />
                </div>
        });
        }
        return columns
    }

    handleDelete = (eventId) => {
    const delUrl = backendAPI.concat(`/timeline/del_event?event_id=${eventId}`);
    axios.post(delUrl, {
        jwt_token: this.props.jwtToken,
    })
        .then((response) => {
            if (response.status === 201){
                message.warning(response.data)
            }
            else if (response.status === 200){
                message.success(response.data, 1.5);
                this.props.setReRenderTimeline(1);
            }
    });
    };



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
        if (this.props.viewMode === 'preview_table'){
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
                style={{
                      // width: '90%',
                      display: 'flex',
                      justifyContent: 'center',
                      // borderRadius: '30px',
                      // borderColor: '#ddd',

                  }}
            />
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
        showEditEventModal: (eventId) => {dispatch(showEditEventModalAction(eventId))},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryTable);
