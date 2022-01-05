'use strict';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { showAlert } from './alert';

export async function delComment(id) {
    try {
        const res = await axios({
            method: `PATCH`,
            url: `/api/v1/printers/${id}`,
            data: {
                comment: ``,
            },
        });
        // console.log(res);
        if (res.data.status === 'success') {
            showAlert('success', 'Data delete successfully');
            setTimeout(() => {
                window.location.assign('/monitoring');
            }, 1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}
