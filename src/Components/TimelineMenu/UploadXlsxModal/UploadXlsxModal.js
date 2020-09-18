import React from 'react';
import {Divider, message, Modal, Typography, Upload} from "antd";
import {connect} from "react-redux";
import {controlUploadXlsxModalAction} from "../../../Actions/modalsActions";
import {FileExcelOutlined} from '@ant-design/icons';
import {backendXlsxAPI} from "../../../Structure/api";
import {setReRenderTimelineAction} from "../../../Actions/siteActions";

const { Dragger } = Upload;

const {Title, Text, Paragraph} = Typography;

class UploadXlsxModal extends React.Component {

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('Missing fields!')
    };

    closeModal = () => {
        this.props.hideUploadXlsxModalAction();
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        // console.log(e);
        this.props.hideUploadXlsxModalAction();
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        // console.log(e);
        this.props.hideUploadXlsxModalAction();
        this.setState({
            visible: false,
        });
        this.props.setReRenderTimeline(1);
    };

    draggerProps = {
        name: `upfile`,
        action: backendXlsxAPI.concat(`/${this.props.urlAddress}/upload_xlsx`),
        accept:".xlsx",
        onChange(info) {
            // console.log(info);
            const { status, response } = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                if (response.code === 200){
                    message.success(response.message, 3);

                }
                else if (response.code === 201){
                    message.warning(response.message, 3);
                }

            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    render(){
        return(
            <Modal
                title="Upload Excel Data"
                visible={this.props.showUploadXlsxModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{borderRadius: '16px',}}
                footer={null}
            >
                <Title level={4} style={{textAlign: 'center'}}>Upload Your M.D table to story!</Title>
                <Divider/>
                <Title level={4} >File structure:</Title>
                <Paragraph>
                    <ul>
                        <li>xlsx file, not csv.</li>
                        <li>First line is headers.</li>
                        <li>The headers are: title, content, link, event_time, color, icon, tags, create_user.</li>
                        <li><Text strong>Required headers: title, event_time.</Text></li>
                        <li>All headers in small letters.</li>
                        <li>Time format: "YYYY-mm-dd HH:MM:SS".</li>
                        <li>Color is text in format: "rgb(233, 30, 99)" or "#FFFFFF".</li>
                        <li>Tags: separated by commas.</li>
                        <li>Multi sheets is optional- only if they have the same headers.</li>
                    </ul>
                </Paragraph>
                <Dragger {...this.draggerProps}>
                    <p className="ant-upload-drag-icon">
                        <FileExcelOutlined style={{color: '#008000'}}/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>



            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,
        showUploadXlsxModal: state.modalsReducer.showUploadXlsxModal,
    }
};

const mapDispatchToProps = dispatch => {
    return{
        hideUploadXlsxModalAction: () => {dispatch(controlUploadXlsxModalAction(false))},
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}


    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(UploadXlsxModal);

