import React from 'react';
import {message, Popover, Tag} from 'antd';
import {PaperClipOutlined } from '@ant-design/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';


/*
Props:
filesList
eventId
url - story url
 */

class FilesView extends React.Component{

    HandleOnClickDownload(){

    };

    render() {
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
                             onClick={() => this.HandleOnClickDownload()}
                        >
                            {displayName}
                        </Tag>
                    </Popover>
                )
            })
        )
    }
}

export default FilesView;