import React from "react";
import * as XLSX  from 'xlsx'

const ExcelUploader = ({ setData }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader =  new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'})
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
        }
        reader.readAsArrayBuffer(file);
    };

    return <input type="file" onChange={handleFileUpload} />
}

export default ExcelUploader;