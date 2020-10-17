import React from 'react';
import {Upload, Button, message} from "antd";
import {connect} from "react-redux";
import {UploadOutlined } from '@ant-design/icons';
import {backendXlsxAPI} from "../../../Structure/api";
import {setReRenderTimelineAction} from "../../../Actions/siteActions";
import {apiDeleteEventFile} from "../../../Actions/apiActions";

const { Dragger } = Upload;

/*
Based on the UploadExcel, with changes from antd.
Need to get as props:
- url - story URL
- eventId
- files list
 */

class UploadEventFiles extends React.Component {
    constructor(props) {
        super(props);
    }

    onRemoveFile(file, jwtToken, url, eventId, fileId){
        apiDeleteEventFile(jwtToken, url, eventId, file.fileId)
            .then((response) => {
                    if (response.status === 200){
                        message.success("Deleted File");
                        return true;
                    }
                    else{
                        message.warning(response.data);
                        return false
                    }
                }
            )
    }

    uploadUrl = backendXlsxAPI.concat(`/${this.props.url}/${this.props.eventId}/upload_file?jwt_token=${this.props.jwtToken}`);

    Uploadprops = {
        name: `upfile`,
        method: 'post',
        action: this.uploadUrl,
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
        defaultFileList:
            this.props.filesList.map(function (fileData, index) {
                return {
                    uid: index.toString(),
                    fileId: fileData.file_id,
                    name: fileData.file_name,
                    status: 'done',
                }
            }),
        showUploadList: true,
        onRemove: (file) => this.onRemoveFile(file, this.props.jwtToken, this.props.url, this.props.eventId)

    };




    render(){
        return(
            <Upload {...this.Uploadprops}>
                <Button icon={<UploadOutlined />}>Upload Files</Button>
            </Upload>
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
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}


    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(UploadEventFiles);

