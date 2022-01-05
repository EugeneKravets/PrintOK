'use strict';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { showAlert } from './alert';
// model,
//     sn,
//     ip,
//     location,
//     department,
//     owner,
//     contract,
//     returns,
//     notes
export async function updateFn(id, obj) {
    try {
        const res = await axios({
            method: `PATCH`,
            url: `/api/v1/printers/${id}`,
            data: obj,
            // data: {
            //     obj,
            // },
        });
        // console.log(res);
        if (res.data.status === 'success') {
            showAlert('success', 'Data update successfully');
            setTimeout(() => {
                window.location.assign('/inventory');
                // location.assign('/inventory');
            }, 1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}
