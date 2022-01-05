'use strict';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { showAlert } from './alert';

export async function deleteCount(query) {
    const getCurrentYear = String(new Date().getFullYear());
    try {
        const res = await axios({
            method: `DELETE`,
            url: `/api/v1/diagram?${query}`,
        });
        console.log(res);
        if (res.status === 204) {
            showAlert('success', 'Data delete successfully');
            setTimeout(() => {
                window.location.assign(`/diagrams?year=${getCurrentYear}`);
            }, 1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}
