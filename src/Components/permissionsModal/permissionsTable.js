import React from "react";
import axois from 'axios'
import {Table, Tag} from "antd";
import {backendAPI} from "../../Structure/api";

const colormap = {
    'read': 'geekblue',
    'write': 'volcano',
    'owner': 'red'
};


const columns = [
      {
    title: 'User Name',
    dataIndex: 'username',
    key: 'username',
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

class PermissionsTable extends React.Component{
    state={
                isLoaded: false,
    };
    fetchData() {
                const apiGetPermissions = backendAPI.concat(`/timeline/${this.props.url}/permitted_users`);
        axois.get(apiGetPermissions)
            .then(res => res.data)
            .then( (data) => {
                this.setState( {
                    permissionsData: data,
                    isLoaded: true,
                });
            })

    }

    componentWillMount() {
        this.fetchData()

    }


    render() {
        if (!this.state.isLoaded) {
            return( <p> not loaded</p>)
        }
        else {


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

export default PermissionsTable