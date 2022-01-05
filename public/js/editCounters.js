'use strict';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import { showAlert } from './alert';

export async function editCount(id, value) {
    try {
        const res = await axios({
            method: `PATCH`,
            url: `/api/v1/diagram/${id}`,
            data: {
                counter: `${value}`,
            },
        });
        console.log(res.data);
        const year = window.location.search.split(`=`)[1];
        // console.log(year);
        if (res.data.status === 'success') {
            showAlert('success', 'Data update successfully');
            setTimeout(() => {
                window.location.assign(`/diagrams?year=${year}`);
            }, 1500);
        }
    } catch (error) {
        // console.log(error.response.data.message);
        showAlert('error', error.response.data.message);
    }
}
