import React from "react";
import axios from 'axios'
import {Button, ConfigProvider, Input, Space, Table, Tag} from "antd";
import {backendAPI} from "../../Structure/api";
import {connect} from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from '@ant-design/icons';
import {Typography} from "antd";
const {Paragraph} = Typography;


function handleText (text){
    return <ConfigProvider direction={"rtl"} >
        <Paragraph style={{whiteSpace: "pre-line", textAlign: 'center'}}>
            {text}
        </Paragraph>
    </ConfigProvider>

}


const colormap = {
    'read': 'geekblue',
    'write': 'volcano',
    'owner': 'red',
    'creator': 'black'
};


class PermissionsTable extends React.Component{
    state={
        isLoaded: false,
    };

    fetchData() {
        const apiGetPermissions = backendAPI.concat(`/timeline/${this.props.url}/permitted_users`);
        axios.post(apiGetPermissions,
            {
                jwt_token: this.props.jwtToken,
            })
            .then(res => res.data)
            .then( (data) => {
                this.setState( {
                    permissionsData: data,
                    isLoaded: true,
                });
            })

    }
    setColumns() {

        const columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                ...this.getColumnSearchProps('username'),

            },
            {
                title: 'Name',
                dataIndex: 'display_name',
                key: 'display_name',
                ...this.getColumnSearchProps('display_name'),

            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                render:  tag => (
                    <>{

                        <Tag color={colormap[tag]} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    }


                    </> )
            }];
        return columns;
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


    componentWillMount() {
        this.setState({
            addedPermission: this.props.addedPermission
        });
        this.fetchData()
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.addedPermission !== this.state.addedPermission){
            this.fetchData();
            this.setState({
                addedPermission: this.props.addedPermission
            })
        }
    }



    render() {
        if (!this.state.isLoaded) {
            return( <p> not loaded</p>)
        }
        else {
            const columns = this.setColumns();


            return(
                <div>

                    <Table
                        columns={columns}
                        dataSource={this.state.permissionsData}
                        loading={this.state.loading}/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,

    }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsTable);
