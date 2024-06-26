"use strict";
let data = {
    view: 'home',
    entries: [],
    favorites: [],
};
const foo = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDZj';
const bar = 'MTEyZWEwOTg2N2Q4MmJjMzNmMTc0YzZjNjkyMSIsInN1YiI6IjY1YTAzN2I4NzI2ZmI';
const baz = 'xMDEyYmY4YWY5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CU2LQtrnjr4YUnU4bl7n9bFGYwY9XJOsSiyISbpsDcs';
const previousJsonData = localStorage.getItem('json-key-localstorage');
if (previousJsonData !== null) {
    data = JSON.parse(previousJsonData);
}
window.addEventListener('beforeunload', () => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('json-key-localstorage', jsonData);
});
