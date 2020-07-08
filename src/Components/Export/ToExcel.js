import axios from "axios";
import {message} from 'antd';
import moment from 'moment';
import {backendAPI} from "../../Structure/api";



const SystemName = 'Story';
const fileDownload = require('js-file-download');


function DownloadExcel(timeline_url, jwtToken) {
    const apiGetExcel = backendAPI.concat(`/timeline/${timeline_url}/get_xlsx`);
    const output_file_name = `${SystemName}_${timeline_url}_${moment().format('YYYYMMDD-hhmmss')}.xlsx`;
    axios.post( apiGetExcel,{
        jwt_token: jwtToken,
        },
        {
        responseType: 'blob',
}
)
        .then((response) => {
            // console.log("resp", response);
            if (response.status !== 200){
                message.warning(response.data)
            }
            else if (response.status === 200){
                fileDownload(new Blob([response.data]), output_file_name);
                message.success("Downloaded Timeline Excel!", 1.5)
  }
  })
}

export default DownloadExcel