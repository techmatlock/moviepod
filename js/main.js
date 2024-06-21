"use strict";
/* global data */
const $row = document.querySelector('.movies-row');
const $mainWrapper = document.querySelector('.main-wrapper');
if (!$row)
    throw new Error('$row not found.');
if (!$mainWrapper)
    throw new Error('$mainWrapper not found.');
let moviesArr = [];
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
        // Add to global variable
        moviesArr = resultsArr;
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
function renderMovieDetails(data) {
    const $movieImgWrapper = document.createElement('div');
    $movieImgWrapper.setAttribute('class', 'movie__image-wrapper column-half');
    const $movieImg = document.createElement('img');
    $movieImg.setAttribute('src', 'http://image.tmdb.org/t/p/w500/' + data.poster_path);
    $movieImg.setAttribute('alt', data.title + ' Movie Poster');
    /*
    <div class="movie__image-wrapper column-half">
            <img class="learn__more-img" src="images/batman.jpg" alt="">
          </div>
            <div class="movie-summary column-half">
                <div class="learn__more-title">
                  <h2>Movie Title</h2>
                </div>
                <div class="learn__more-release">
                  <h3>1994</h3>
                </div>
                <div class="learn__more-summary">
                  <p>
                    In "The Dark Knight," Batman, with the help of Lt. Gordon and DA Harvey Dent, faces a new foe: the Joker. This chaotic criminal mastermind wreaks havoc on Gotham City, pushing Batman to his limits and challenging his ideals. The battle tests their morals and reshapes Gotham's future.
                  </p>
                </div>
              </div>
          </div>
          <div class="movie-divider row justify-end">
            <div class="divider"></div>
          </div>
            <div class="row learn__more-share">
              <a href=""><img src="images/share-solid.svg" alt=""></a>
              <a href="#"><img src="images/facebook.svg" alt=""></a>
              <a href="#"><img src="images/x-twitter.svg" alt=""></a>
            </div>
            <div class="movie__ranking-wrapper row">
              <div class="column-full">
                <div class="movie-rating row justify-end align-center">
                  <h2>Rating</h2>
                  <div class="pill__line-lg"></div>
                  <h2 class="movie__ranking-margin">9.4</h2>
                </div>
              </div>
              <div class="column-full">
                <div class="movie-rating row justify-end align-center">
                  <h2>Votes</h2>
                  <div class="pill__line-lg"></div>
                  <h2>18,754</h2>
                </div>
              </div>
              <div class="column-full">
                <div class="movie-rating row justify-end align-center">
                  <div class="column-half genre-margin">
                    <h2 class="row justify-end">Genres</h2>
                  </div>
                  <div class="column-half">
                    <div class="row genre-pills">
                      <h4 class="pill__line-sm row justify-center align-center pill-genre">action</h4>
                      <h4 class="pill__line-sm row justify-center align-center pill-genre">comedy</h4>
                      <h4 class="pill__line-sm row justify-center align-center pill-genre">drama</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    */
}
$row.addEventListener('click', (event) => {
    const $eventTarget = event.target;
    if (!$eventTarget.matches('a'))
        return;
    const $card = $eventTarget.closest('.card');
    if (!$card)
        throw new Error('$card not found');
    const cardId = $card?.getAttribute('data-id');
    if (!cardId)
        throw new Error('cardId not found.');
    for (let i = 0; i < moviesArr.length; i++) {
        if (moviesArr[i].id === +cardId) {
            const card = renderMovieDetails(moviesArr[i]);
            $mainWrapper.appendChild(card);
        }
    }
});
getMovies();
