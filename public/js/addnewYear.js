'use strict';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import { showAlert } from './alert';

export async function addNewYear(obj) {
    try {
        const res = await axios({
            method: `POST`,
            url: `/api/v1/diagram`,
            data: obj,
        });
        console.log(res.data);
        const year = String(new Date().getFullYear());
        // console.log(year);
        if (res.data.status === 'success') {
            showAlert('success', 'Data added successfully');
            setTimeout(() => {
                window.location.assign(`/diagrams?year=${year}`);
            }, 1500);
        }
    } catch (error) {
        // console.log(error.response.data.message);
        showAlert('error', error.response.data.message);
    }
}
