"use strict";
/* global data */
const $row = document.querySelector('.movies-row');
if (!$row)
    throw new Error('$row not found.');
const foo = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDZj';
const bar = 'MTEyZWEwOTg2N2Q4MmJjMzNmMTc0YzZjNjkyMSIsInN1YiI6IjY1YTAzN2I4NzI2ZmI';
const baz = 'xMDEyYmY4YWY5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CU2LQtrnjr4YUnU4bl7n9bFGYwY9XJOsSiyISbpsDcs';
async function getMovies() {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + foo + bar + baz,
            },
        };
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        if (!response.ok)
            throw new Error('Failed to get a response.');
        const responseData = await response.json();
        const resultsArr = responseData.results;
        // Render each movie to DOM
        for (let i = 0; i < resultsArr.length; i++) {
            const movieElement = renderCard(resultsArr[i]);
            $row.appendChild(movieElement);
        }
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
}
function renderCard(data) {
    const $outerColumn = document.createElement('div');
    $outerColumn.setAttribute('class', 'column-fourth');
    const $cardDivElement = document.createElement('div');
    $cardDivElement.setAttribute('class', 'card');
    $cardDivElement.setAttribute('data-id', data.id.toString());
    $outerColumn.appendChild($cardDivElement);
    const $cardImage = document.createElement('img');
    $cardImage.setAttribute('class', 'card-img');
    $cardImage.setAttribute('src', 'http://image.tmdb.org/t/p/w500/' + data.poster_path);
    $cardImage.setAttribute('alt', data.title + ' Movie Poster');
    $cardDivElement.appendChild($cardImage);
    const $cardContent = document.createElement('div');
    $cardContent.setAttribute('class', 'card-content');
    $cardDivElement.appendChild($cardContent);
    const $cardContentRowTitle = document.createElement('div');
    $cardContentRowTitle.setAttribute('class', 'column-full row');
    const $cardTitle = document.createElement('h2');
    $cardTitle.setAttribute('class', 'card-title');
    $cardTitle.textContent = data.title;
    const $cardContentRatingRow = document.createElement('div');
    $cardContentRatingRow.setAttribute('class', 'column-full row');
    const $spanElement = document.createElement('span');
    $spanElement.setAttribute('class', 'circle row align-center justify-center card-rating');
    $spanElement.textContent = data.vote_average.toFixed(1);
    $cardContentRowTitle.appendChild($cardTitle);
    $cardContentRatingRow.appendChild($spanElement);
    $cardContent.appendChild($cardContentRowTitle);
    $cardContent.appendChild($cardContentRatingRow);
    const $cardContentRowTwo = document.createElement('div');
    $cardContentRowTwo.setAttribute('class', 'column-full row');
    const $releaseDate = document.createElement('h3');
    $releaseDate.setAttribute('class', 'card-date');
    $releaseDate.textContent = data.release_date.split('-')[0];
    $cardContentRowTwo.appendChild($releaseDate);
    $cardContent.appendChild($cardContentRowTwo);
    const $cardBtnRow = document.createElement('div');
    $cardBtnRow.setAttribute('class', 'column-full');
    const $cardBtn = document.createElement('div');
    $cardBtn.setAttribute('class', 'card-btn');
    const $anchorElement = document.createElement('a');
    $anchorElement.setAttribute('href', '#');
    $anchorElement.textContent = 'Learn More';
    $cardBtn.appendChild($anchorElement);
    $cardBtnRow.appendChild($cardBtn);
    $cardContent.appendChild($cardBtnRow);
    return $outerColumn;
}
getMovies();
