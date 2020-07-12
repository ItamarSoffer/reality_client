import React from "react";
import axios from 'axios'
import {Table, Tag} from "antd";
import {backendAPI} from "../../Structure/api";
import {connect} from "react-redux";


const colormap = {
    'read': 'geekblue',
    'write': 'volcano',
    'owner': 'red',
    'creator': 'black'
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
