import {message} from 'antd';
import moment from 'moment';
import {apiDownloadExcel} from "../../Actions/apiActions";



const SystemName = 'Story';
const fileDownload = require('js-file-download');


function DownloadExcel(timeline_url, jwtToken) {
    const output_file_name = `${SystemName}_${timeline_url}_${moment().format('YYYYMMDD-hhmmss')}.xlsx`;
    apiDownloadExcel(jwtToken, timeline_url)
        .then((response) => {
            // console.log("resp", response);
            if (response.status !== 200){
                message.warning(response.data)
            }
            else if (response.status === 200){
                fileDownload(new Blob([response.data]), output_file_name);
                message.success("Downloaded Story Excel!", 1.5)
            }
        })
}

export default DownloadExcel