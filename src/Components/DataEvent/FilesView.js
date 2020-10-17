import React from 'react';
import {message, Popover, Tag} from 'antd';
import {PaperClipOutlined } from '@ant-design/icons';
import {apiDownloadEventFile} from "../../Actions/apiActions";
import {connect} from "react-redux";

const fileDownload = require('js-file-download');

/*
Props:
filesList
eventId
url - story url
 */

function HandleOnClickDownload(jwtToken, url, eventId, fileId, fileName) {
    apiDownloadEventFile(jwtToken, url, eventId, fileId)
        .then((response) => {
            // console.log("resp", response);
            if (response.status !== 200) {
                message.warning(response.data)
            } else if (response.status === 200) {
                fileDownload(new Blob([response.data]), fileName);
                message.success("Downloaded file", 1.5)
            }
        });
}

class FilesView extends React.Component{

    render() {
        const jwtToken = this.props.jwtToken;
        const eventId = this.props.eventId;
        const url = this.props.url;
        return (
            this.props.filesList.map(function(fileData){

                let displayName = fileData.file_name;
                if (displayName.length > 20) {
                    displayName = displayName.slice(0, 12) + '...' + displayName.slice(-8);
                }
                return (

                    <Popover content={`Download ${fileData.file_name}`}>

                        <Tag color={'#595959'}
                             icon={<PaperClipOutlined />}
                             fileName={fileData.file_name}
                             onClick={() => HandleOnClickDownload(jwtToken, url, eventId, fileData.file_id, fileData.file_name)}
                        >
                            {displayName}
                        </Tag>
                    </Popover>
                )
            })
        )
    }
}

const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,
    }
};

const mapDispatchToProps = dispatch => {
    return{
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(FilesView);
