'use strict';
import axios from 'axios';
import { showAlert } from './alert';

export async function loginFn(login, password) {
    try {
        console.log(login, password);
        const res = await axios({
            method: 'POST',
            url: `/api/v1/users/login`,
            // url: `http://192.168.0.105:3000/api/v1/users/login`,
            data: {
                login,
                password,
            },
        });
        console.log(res);
        if (res.data.status === `success`) {
            showAlert(`success`, `logged in successfully`);
            window.setTimeout(() => {
                location.assign('/inventory');
            }, 1500);
        }
    } catch (err) {
        // console.log(err.response.data.message);
        showAlert(`error`, err.response.data.message);
    }
}

// document.querySelector(`.form`).addEventListener(`submit`, (e) => {
//     e.preventDefault();
//     const login = document.getElementById('login').value;
//     const password = document.getElementById('password').value;
//     loginFn(login, password);
// });

export async function logOutFn() {
    try {
        const res = await axios({
            method: 'GET',
            // url: `http://localhost:3000/api/v1/users/logout`,
            url: `/api/v1/users/logout`,
        });
        if (res.data.status === `success`) {
            // location.reload(true) // reload page on the client
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert(`error`, `Error logging out! try again`);
    }
}
