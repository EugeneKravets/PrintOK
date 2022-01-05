'use strict';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { showAlert } from './alert';

export async function updComment(id, obj) {
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
                window.location.assign('/monitoring');
            }, 1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}
