'use strict';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import { showAlert } from './alert';

export async function addPrinterFn(obj) {
    try {
        const res = await axios({
            method: `POST`,
            url: `/api/v1/printers`,
            data: obj,
            // data: {
            //     obj,
            // },
        });
        console.log(res);
        if (res.data.message === 'success') {
            showAlert('success', 'Data added successfully');
            setTimeout(() => {
                window.location.assign('/inventory');
                // location.assign('/inventory');
            }, 1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}
