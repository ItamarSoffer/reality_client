import React from 'react';
import axios from "axios";
import {message} from 'antd';
import moment from 'moment';

const SystemName = 'NZT';
const fileDownload = require('js-file-download');
const options = {
    headers: {
        responseType: 'blob'
    }
};


function DownloadExcel(timeline_url) {
    const api_get_excel = `http://localhost:5005/api//timeline/${timeline_url}/get_xlsx`;
    axios({
    method:'GET',
    url: api_get_excel,
    responseType: 'blob'
})
        .then((response) => {
            console.log("resp", response);
            if (response.status !== 200){
                message.warning(response.data)
            }
            else if (response.status === 200){
                fileDownload(new Blob([response.data]), `${SystemName}_${timeline_url}_${moment().format('YYYYMMDD-hhmmss')}.xlsx`);
                message.success("Downloaded Timeline Excel!", 1.5)
  }
  })
}

export default DownloadExcel