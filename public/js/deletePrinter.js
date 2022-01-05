'use strict';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { showAlert } from './alert';

export async function deleteFn(id) {
    try {
        const res = await axios({
            method: `DELETE`,
            url: `/api/v1/printers/${id}`,
        });
        console.log(res);
        if (res.status === 204) {
            showAlert('success', 'Data delete successfully');
            setTimeout(() => {
                window.location.assign('/inventory');
            }, 1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}
