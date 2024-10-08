"use strict";
const dataKey = 'movie-search-data';
const data = readData();
function readData() {
    const localData = localStorage.getItem(dataKey);
    if (localData) {
        return JSON.parse(localData);
    }
    return {
        view: 'search-form',
        movies: [],
    };
}
function writeData() {
    localStorage.setItem(dataKey, JSON.stringify(data));
}
