'use strict';

import ApexCharts from 'apexcharts';
import { loginFn, logOutFn } from './login.js';
import { updateFn } from './updatePrinter.js';
import { addPrinterFn } from './addPrinter.js';
import { deleteFn } from './deletePrinter.js';
//
import { deleteAdd } from './deleteAdd.js';
import { addFn } from './addLocation.js';
//
import { options } from './chartOptions.js';
import { noOptions } from './noData.js';
import { editCount } from './editCounters.js';
import { deleteCount } from './deleteCounters.js';
import { addNewYear } from './addnewYear.js';
import { showAlert } from './alert';
//
import { updComment } from './updateComment.js';
import { delComment } from './deleteComment.js';
//
import 'regenerator-runtime/runtime';
import '@babel/polyfill';
// DOM elements
const loginForm = document.querySelector(`.form`);
const logOutBtn = document.querySelector(`.logOutBtn`);

const saveBtn = document.querySelector(`#btn--save`);
const newPrinterBtn = document.querySelector(`#btn__new--save`);
const newPrinterLocations = document.querySelector(`#locations`);
const allBtn = document.querySelectorAll(`#delete_printer`);

// Modal
const btnCloseModal = document.querySelector(`.close__modal`);
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const cancelButton = document.querySelector(`.control__cancel`);
const controlDeleteModal = document.querySelector(`.control__delete`);
//
// Filter
const allFilterBtn = document.querySelectorAll(`.filter__btn`);
//
// Navbar
const navBarItems = document.querySelectorAll(`.nav__links__items`);
//
// Add button page
const addBtn = document.querySelector(`#add__btn_add`);
const addBtnDel = document.querySelector(`#add__btn_del`);
const dropDownList = document.querySelector(`#rc`);
//
// charts
const charts = document.querySelector(`#chart`);
const dataValue = document.querySelector(`#data-months`);
const yearButton = document.querySelectorAll(`.btn--year`);
const editCounters = document.querySelector(`#edit_count`);
const deleteCounters = document.querySelector(`#delete_count`);
const counterBtnBack = document.querySelector(`#counter__btn--back`);
const counterBtnSave = document.querySelector(`#counter__btn--save`);
const newCounterBtnBack = document.querySelector(`#new_count__btn--back`);
const newCounterBtnSave = document.querySelector(`#new_count__btn--save`);
//
// returns page
const allFilterBtnReturns = document.querySelectorAll(`.filter__btn-returns`);
//
// Monitoring
const allAddBtnMon = document.querySelectorAll(`.monitoring__btn--add`);
const allDeleteBtnMon = document.querySelectorAll(`.monitoring__btn--delete`);
const allMonitoringBtn = document.querySelectorAll(`.filter__btn-monitoring`);
const timerMonitoring = document.querySelector(`.timer__time`);
//
// global variables
const getCurrentYear = String(new Date().getFullYear());
const url = window.location.href;
const newUrl = new URL(url);
let startSeconds = 0;
function updateCounter() {
    startSeconds++;
    let hour = Math.floor(startSeconds / 3600);
    let minutes = Math.floor((startSeconds - hour * 3600) / 60);
    let seconds = startSeconds - (hour * 3600 + minutes * 60);
    timerMonitoring.innerHTML = `${minutes} min : ${seconds} sec`;
}
//
// login, logout buttons
if (loginForm) {
    loginForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        loginFn(login, password);
    });
}
if (logOutBtn) {
    logOutBtn.addEventListener(`click`, logOutFn);
}
//
// edit printer
if (saveBtn) {
    saveBtn.addEventListener(`click`, (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.id;

        // const model = document.getElementById('model').value;
        // const sn = document.getElementById('sn').value;
        // const ip = document.getElementById('ip').value;
        // const location = document.getElementById('location').value;
        // const department = document.getElementById('department').value;
        // const owner = document.getElementById('owner').value;
        // const contract = document.getElementById('contract').value;
        // const returns = document.getElementById('returns').value;
        // const notes = document.getElementById('notes').value;

        // console.log(model, sn, ip, location, department, owner, contract, returns, notes);
        // updateFn(
        //     id,
        //     model,
        //     sn,
        //     ip,
        //     location,
        //     department,
        //     owner,
        //     contract,
        //     returns,
        //     notes
        // );

        const inp = document.getElementsByTagName(`input`);
        // console.log(inp);
        const loc = document.getElementById(`locations`).getAttribute('name');
        const val = document.getElementById(`locations`).value;
        // console.log(val);
        // console.log(locAddNew);
        console.log(`location=`, loc);
        let obj = {};
        for (let i = 0; i < inp.length; i++) {
            if (inp[i].value !== inp[i].defaultValue) {
                console.log(inp[i].name);
                console.log(inp[i].value);
                obj[inp[i].name] = inp[i].value;
                // console.log(inp[i].defaultValue);
            }
        }
        if (locAddNew !== undefined) {
            obj[`${loc}`] = `${locAddNew}`;
        }
        // console.log(obj);
        updateFn(id, obj);
    });
}
//
// Add new printer
if (newPrinterBtn) {
    newPrinterBtn.addEventListener(`click`, (e) => {
        e.preventDefault();
        const inp = document.getElementsByTagName(`input`);
        console.log(inp);
        const loc = document.getElementById(`locations`).getAttribute('name');
        console.log(`location=`, loc);
        let obj = {};
        for (let i = 0; i < inp.length; i++) {
            obj[inp[i].name] = inp[i].value;
        }
        obj[`${loc}`] = `${locAddNew}`;
        console.log(obj);
        addPrinterFn(obj);
    });
}
if (newPrinterLocations) {
    newPrinterLocations.addEventListener(`click`, handlerSelectLocations);
}
//
// delete printer
if (allBtn) {
    // console.log(allBtn);
    for (let i = 0; i < allBtn.length; i++) {
        document.querySelectorAll('.actions__save')[i].addEventListener(`click`, (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            controlDeleteModal.addEventListener(`click`, () => {
                const id = allBtn[i].getAttribute('value');
                console.log(id);
                deleteFn(id);
            });
        });
    }
}
// close modal
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
if (btnCloseModal && overlay && cancelButton) {
    btnCloseModal.addEventListener(`click`, closeModal);
    overlay.addEventListener('click', closeModal);
    cancelButton.addEventListener(`click`, closeModal);
}
document.addEventListener('keydown', function (e) {
    // console.log(e.key);

    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

if (navBarItems) {
    const curHref = window.location.href;
    for (let i = 0; i < navBarItems.length; i++) {
        if (curHref.search(navBarItems[i].href) !== -1) {
            navBarItems[i].classList.add(`active`);
        }
    }
}

if (allFilterBtn) {
    for (const i of allFilterBtn) {
        i.addEventListener(`click`, () => {
            if (i.getAttribute(`value`) !== `all`) {
                newUrl.searchParams.set(`location`, `${i.getAttribute(`value`)}`);
                window.location.replace(newUrl.href);
            }
            if (i.getAttribute(`value`) === `all`) {
                newUrl.searchParams.delete(`location`);
                window.location.replace(newUrl.href);
            }
        });
    }
}

// console.log(window.location.protocol);
// console.log(window.location.host);
// console.log(`${window.location.protocol}//${window.location.host}`);
// console.log(window.location.pathname);
// console.log(newUrl.search.split(`=`)[1]);
// console.log(newUrl.href);
///

if (window.location.search === newUrl.search) {
    const allBtnArray = Array.from(allFilterBtn);
    // console.log(allBtnArray);
    const locationButton = allBtnArray.find(
        (btn) => btn.id === newUrl.search.split(`=`)[1]
    );
    if (locationButton) {
        locationButton.classList.add(`active__btn`);
    }
}
if (
    window.location.href ===
    `${window.location.protocol}//${window.location.host}/inventory`
) {
    document.getElementById(`all`).classList.add(`active__btn`);
}

// const valueArray = window.location.search.match(newUrl.search);
// console.log(valueArray);
// const value = valueArray ? valueArray[1] : null;
//
// Add page buttons
let locAddNew;
function handlerSelectLocations() {
    Array.from(newPrinterLocations.options).forEach(function (optionsElement) {
        // console.log(optionsElement.selected);
        if (optionsElement.selected) {
            locAddNew = optionsElement.value;
            // console.log(locAddNew);
            return locAddNew;
        }
    });
    // select = e.target.value;
    // console.log(e.target);
    // return select;
}

let select;
function handlerSelect() {
    Array.from(dropDownList.options).forEach(function (optionsElement) {
        // console.log(optionsElement.target.value);
        // console.log(optionsElement.selected);
        if (optionsElement.selected) {
            select = optionsElement.id;
            return select;
        }
    });
    // select = e.target.value;
    // console.log(e.target);
    // return select;
}
if (dropDownList) {
    // Array.from(dropDownList.options).forEach(function (optionsElement) {
    //     console.log(optionsElement.id);
    // });
    dropDownList.addEventListener(`click`, handlerSelect); //(e) => {
    // console.log(e.target);
    // for (let i = 0; i < e.target.length; i++) {
    //     console.log(e.target[i].id);
    // }
    // });
}
if (addBtnDel) {
    addBtnDel.addEventListener(`click`, (e) => {
        // console.log(`delete`);
        // console.log(select);
        if (typeof select !== `undefined`) {
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            // console.log(select);
            controlDeleteModal.addEventListener(`click`, () => {
                deleteAdd(select);
            });
        }
    });
}
// if (addBtnEdit) {
//     addBtnEdit.addEventListener(`click`, (e) => {
//         if (typeof select !== `undefined`) {
//             document.getElementById(`rc_input`).value = select;
//         }
//     });
// }
if (addBtn) {
    addBtn.addEventListener(`click`, (e) => {
        const inp = document.getElementsByTagName(`input`);
        // console.log(inp);
        let obj = {};
        for (let i = 0; i < inp.length; i++) {
            obj[inp[i].name] = inp[i].value;
        }
        addFn(obj);
    });
}
//
// Diagrams

if (charts && dataValue) {
    const counters = charts.dataset.counters.split(`,`);
    const months = dataValue.dataset.months.split(`,`);
    // console.log(months);
    console.log(counters.length);
    console.log(months.length);
    if (counters && months) {
        const chart = new ApexCharts(charts, options);
        chart.render();
        chart.updateOptions({
            series: [
                {
                    data: counters,
                },
            ],
            xaxis: {
                categories: months,
            },
        });
    }
    if (counters.length === 1 && months.length === 1) {
        const chart = new ApexCharts(charts, noOptions);
        chart.render();
    }
}

if (
    window.location.href ===
    `${window.location.protocol}//${window.location.host}/diagrams`
) {
    window.location.replace(
        `${window.location.protocol}//${window.location.host}/diagrams?year=${getCurrentYear}`
    );
}
if (yearButton) {
    // console.log(yearButton);
    for (const i of yearButton) {
        i.addEventListener(`click`, () => {
            yearButton.forEach((b) => b.classList.remove(`active__btn`));
            // i.classList.add(`active__btn`);
            const value = i.getAttribute('value');
            // console.log(value);
            // const url = window.location.href;
            // const newUrl = new URL(url);
            newUrl.searchParams.set(`year`, `${value}`);
            window.location.replace(newUrl.href);
            // window.location.search = `?location=${i.getAttribute('value')}`;
            //
            // allFilterBtn.forEach((b) => b.classList.remove(`active__btn`));
            // const url = window.location.href;
            // const newUrl = new URL(url);
            // if (i.getAttribute(`value`) !== `all`) {
            //     newUrl.searchParams.set(`location`, `${i.getAttribute(`value`)}`);
            //     window.location.replace(newUrl.href);
            // }
            // if (i.getAttribute(`value`) === `all`) {
            //     newUrl.searchParams.delete(`location`);
            //     window.location.replace(newUrl.href);
            // }
        });
    }
}
if (window.location.search === newUrl.search) {
    const allYearArray = Array.from(yearButton);
    // console.log(allYearArray);
    // console.log(newUrl.search.split(`=`)[1]);
    const yearBtn = allYearArray.find((btn) => btn.id === newUrl.search.split(`=`)[1]);
    if (yearBtn) {
        yearBtn.classList.add(`active__btn`);
    }
}
if (editCounters) {
    editCounters.addEventListener(`click`, () => {
        window.location.replace(
            `${window.location.protocol}//${window.location.host}/editcounters?year=${
                newUrl.search.split(`=`)[1]
            }`
        );
    });
}
if (counterBtnBack) {
    counterBtnBack.addEventListener(`click`, () => {
        window.location.replace(
            `${window.location.protocol}//${window.location.host}/diagrams?year=${
                newUrl.search.split(`=`)[1]
            }`
        );
    });
}
if (
    window.location.href ===
    `${window.location.protocol}//${window.location.host}/editcounters?year=${
        newUrl.search.split(`=`)[1]
    }`
) {
    document.getElementById(`diagrams`).classList.add(`active`);
}
if (counterBtnSave) {
    counterBtnSave.addEventListener(`click`, () => {
        const inp = document.getElementsByTagName(`input`);
        for (let i = 0; i < inp.length; i++) {
            if (inp[i].value !== inp[i].defaultValue) {
                // console.log(inp[i].id);
                // console.log(inp[i].defaultValue);
                // console.log(inp[i].value);
                // console.log(inp[i].name);
                // obj[counter] = [inp[i].value];
                editCount(inp[i].id, inp[i].value);
            }
        }
    });
}
if (deleteCounters) {
    deleteCounters.addEventListener(`click`, () => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        controlDeleteModal.addEventListener(`click`, () => {
            // console.log(window.location.search.slice(1));
            deleteCount(window.location.search.slice(1));
        });
    });
}
if (newCounterBtnBack) {
    newCounterBtnBack.addEventListener(`click`, () => {
        window.location.replace(
            `${window.location.protocol}//${window.location.host}/diagrams?year=${getCurrentYear}`
        );
    });
}
if (newCounterBtnSave) {
    newCounterBtnSave.addEventListener(`click`, (e) => {
        const inp = document.getElementsByTagName(`input`);
        const getCurrentYear = String(new Date().getFullYear());
        let arr = [];
        for (let i = 0; i < inp.length; i++) {
            arr.push({
                name: inp[i].name,
                counter: inp[i].value,
                year: getCurrentYear,
            });
        }
        // console.log(arr);
        const len = e.currentTarget.dataset.len;
        // console.log(len);
        if (len !== `12`) {
            addNewYear(arr);
        } else {
            showAlert('error', `${getCurrentYear} is already exists`);
            // console.log(`${getCurrentYear} is exists`);
        }
    });
}
//
// returns page
if (allFilterBtnReturns) {
    for (const i of allFilterBtnReturns) {
        i.addEventListener(`click`, () => {
            if (i.getAttribute(`value`) !== `all`) {
                newUrl.searchParams.set(`returns`, true);
                newUrl.searchParams.set(`location`, `${i.getAttribute(`value`)}`);
                window.location.replace(newUrl.href);
            }
            if (i.getAttribute(`value`) === `all`) {
                window.location.replace(
                    `${window.location.protocol}//${window.location.host}/returns`
                );
            }
        });
    }
}

if (
    window.location.href ===
    `${window.location.protocol}//${window.location.host}/returns`
) {
    document.getElementById(`all-returns`).classList.add(`active__btn`);
}

if (window.location.search !== ``) {
    // console.log(newUrl.search.split(`&`)[1].split(`=`)[1]);
    const allBtnReturnArray = Array.from(allFilterBtnReturns);
    const locationButton = allBtnReturnArray.find(
        (btn) => btn.id === newUrl.search.split(`&`)[1].split(`=`)[1]
    );
    if (locationButton) {
        locationButton.classList.add(`active__btn`);
    }
}
//
//  Monitoring
let obj = {};
if (allAddBtnMon) {
    for (const i of allAddBtnMon) {
        i.addEventListener(`click`, () => {
            const id = i.getAttribute(`value`);
            const value = i.closest(`div`).querySelector(`input`).value;
            const name = i.closest(`div`).querySelector(`input`).name;
            if (value.length !== 0) {
                obj[`${name}`] = `${value}`;
                updComment(id, obj);
            }
        });
    }
}
if (allDeleteBtnMon) {
    for (const i of allDeleteBtnMon) {
        i.addEventListener(`click`, () => {
            const value = i.closest(`div`).querySelector(`input`).value;
            if (value.length !== 0) {
                modal.classList.remove('hidden');
                overlay.classList.remove('hidden');
                controlDeleteModal.addEventListener(`click`, () => {
                    const id = i.getAttribute(`value`);
                    // console.log(id);
                    delComment(id);
                });
            }
        });
    }
}
if (allMonitoringBtn) {
    for (const i of allMonitoringBtn) {
        i.addEventListener(`click`, () => {
            // i.classList.add(`active__btn`);
            if (i.getAttribute(`value`) === `passive`) {
                window.location.replace(
                    `${window.location.protocol}//${window.location.host}/monitoring`
                );
            }
            if (i.getAttribute(`value`) === `active`) {
                window.location.replace(
                    `${window.location.protocol}//${window.location.host}/monitoring?isActive=true`
                );
            }
        });
    }
}
if (
    window.location.href ===
    `${window.location.protocol}//${window.location.host}/monitoring`
) {
    document.getElementById(`passive`).classList.add(`active__btn`);

    setInterval(updateCounter, 1000);
}
if (window.location.search === `?isActive=true`) {
    document.getElementById(`active`).classList.add(`active__btn`);
}
