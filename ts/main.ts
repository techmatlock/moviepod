/* global data */
const $row = document.querySelector('.movies-row') as HTMLElement;
const $movieDetails = document.querySelector('.movie-details') as HTMLElement;
const $dataViewElements = document.querySelectorAll('[data-view]');

if (!$row) throw new Error('$row not found.');
if (!$movieDetails) throw new Error('$movieDetails not found.');
if (!$dataViewElements) throw new Error('$dataViewElements not found.');

let moviesArr: Movie[] = [];

const genreMap: Record<number, string> = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
};

async function getMovies(): Promise<void> {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + foo + bar + baz,
      },
    };

    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      options,
    );

    if (!response.ok) throw new Error('Failed to get a response.');

    const responseData = await response.json();
    const resultsArr = responseData.results as Movie[];

    // Add to global variable
    moviesArr = resultsArr;

    // Render each movie to DOM
    for (let i = 0; i < resultsArr.length; i++) {
      const movieElement = renderCard(resultsArr[i]);
      $row.appendChild(movieElement);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

function viewSwap(view: string): void {
  $dataViewElements.forEach((element) => {
    const dataViewValue = element.getAttribute('data-view');
    if (view === dataViewValue) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  })
}

function renderCard(data: Movie): HTMLElement {
  const $outerColumn = document.createElement('div');
  $outerColumn.setAttribute('class', 'column-fourth');

  const $cardDivElement = document.createElement('div');
  $cardDivElement.setAttribute('class', 'card');
  $cardDivElement.setAttribute('data-id', data.id.toString());

  $outerColumn.appendChild($cardDivElement);

  const $cardImage = document.createElement('img');
  $cardImage.setAttribute('class', 'card-img');
  $cardImage.setAttribute(
    'src',
    'http://image.tmdb.org/t/p/w500/' + data.poster_path,
  );
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
  $spanElement.setAttribute(
    'class',
    'circle row align-center justify-center card-rating',
  );
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

function renderMovieDetails(data: Movie): void {
  const $mainWrapper = document.createElement('div');
  $mainWrapper.setAttribute('class', 'main-wrapper row flex-wrap');

  $movieDetails.appendChild($mainWrapper);

  const $movieImgWrapper = document.createElement('div');
  $movieImgWrapper.setAttribute('class', 'movie__image-wrapper column-half');

  $mainWrapper.appendChild($movieImgWrapper);

  const $movieImg = document.createElement('img');
  $movieImg.setAttribute('class', 'learn__more-img');
  $movieImg.setAttribute(
    'src',
    'http://image.tmdb.org/t/p/w500/' + data.poster_path,
  );
  $movieImg.setAttribute('alt', data.title + ' Movie Poster');

  $movieImgWrapper.appendChild($movieImg);

  const $movieSummary = document.createElement('div');
  $movieSummary.setAttribute('class', 'movie-summary column-half');

  $mainWrapper.appendChild($movieSummary);

  const $learnTitleDiv = document.createElement('div');
  $learnTitleDiv.setAttribute('class', 'learn__more-title');

  const $movieTitle = document.createElement('h2');
  $movieTitle.textContent = data.title;

  $learnTitleDiv.appendChild($movieTitle);
  $movieSummary.appendChild($learnTitleDiv);

  const $learnReleaseDiv = document.createElement('div');
  $learnReleaseDiv.setAttribute('class', 'learn__more-release');

  const $releaseTitle = document.createElement('h3');
  $releaseTitle.textContent = data.release_date.split('-')[0];

  $learnReleaseDiv.appendChild($releaseTitle);
  $movieSummary.appendChild($learnReleaseDiv);

  const $learnSummaryDiv = document.createElement('div');
  $learnSummaryDiv.setAttribute('class', 'learn__more-summary');

  const $summaryParagraph = document.createElement('p');
  $summaryParagraph.textContent = data.overview;

  $learnSummaryDiv.appendChild($summaryParagraph);
  $movieSummary.appendChild($learnSummaryDiv);

  const $movieDivider = document.createElement('div');
  $movieDivider.setAttribute('class', 'movie-divider row justify-end');

  const $divider = document.createElement('div');
  $divider.setAttribute('class', 'divider');

  $movieDivider.appendChild($divider);

  $movieDetails.appendChild($movieDivider);

  const $learnShareDiv = document.createElement('div');
  $learnShareDiv.setAttribute('class', 'row learn__more-share');

  const $shareIcon = document.createElement('span');

  const $shareImg = document.createElement('img');
  $shareImg.setAttribute('src', 'images/share-solid.svg');
  $shareImg.setAttribute('alt', 'a share icon');

  $shareIcon.appendChild($shareImg);
  $learnShareDiv.appendChild($shareIcon);


  const $facebookLink = document.createElement('a');
  $facebookLink.setAttribute('href', '#');

  const $facebookImg = document.createElement('img');
  $facebookImg.setAttribute('src', 'images/facebook.svg');
  $facebookImg.setAttribute('alt', 'a facebook share link');

  $facebookLink.appendChild($facebookImg);
  $learnShareDiv.appendChild($facebookLink);

  const $xLink = document.createElement('a');
  $xLink.setAttribute('href', '#');

  const $xImg = document.createElement('img');
  $xImg.setAttribute('src', 'images/x-twitter.svg');
  $xImg.setAttribute('alt', 'a x/Twitter link');

  $xLink.appendChild($xImg);
  $learnShareDiv.appendChild($xLink);

  $movieDetails.appendChild($learnShareDiv);

  const $movieRankingWrapper = document.createElement('div');
  $movieRankingWrapper.setAttribute('class', 'movie__ranking-wrapper row');

  const $columnRating = document.createElement('div');
  $columnRating.setAttribute('class', 'column-full');

  $movieRankingWrapper.appendChild($columnRating);

  const $movieRatingDiv = document.createElement('div');
  $movieRatingDiv.setAttribute('class', 'movie-rating row justify-end align-center');

  $columnRating.appendChild($movieRatingDiv);

  const $ratingTitle = document.createElement('h2');
  $ratingTitle.textContent = 'Rating';

  const $largePill1 = document.createElement('div');
  $largePill1.setAttribute('class', 'pill__line-lg');

  const $movieRanking = document.createElement('h2');
  $movieRanking.setAttribute('class', 'movie__ranking-margin');
  $movieRanking.textContent = data.vote_average.toFixed(1).toString();

  $movieRatingDiv.appendChild($ratingTitle);
  $movieRatingDiv.appendChild($largePill1);
  $movieRatingDiv.appendChild($movieRanking);

  $movieDetails.appendChild($movieRankingWrapper);

  const $columnVotes = document.createElement('div');
  $columnVotes.setAttribute('class', 'column-full');

  const $movieVotesDiv = document.createElement('div');
  $movieVotesDiv.setAttribute('class', 'movie-rating row justify-end align-center');

  $columnVotes.appendChild($movieVotesDiv);

  const $votes = document.createElement('h2');
  $votes.textContent = 'Votes';

  const $largePill2 = document.createElement('div');
  $largePill2.setAttribute('class', 'pill__line-lg');

  const $votesNumber = document.createElement('h2');
  $votesNumber.textContent = data.vote_count.toLocaleString();

  $movieVotesDiv.appendChild($votes);
  $movieVotesDiv.appendChild($largePill2);
  $movieVotesDiv.appendChild($votesNumber);

  $movieRankingWrapper.appendChild($columnVotes);

  $movieDetails.appendChild($movieRankingWrapper);

  const $columnGenre = document.createElement('div');
  $columnGenre.setAttribute('class', 'column-full');

  const $movieGenreDiv = document.createElement('div');
  $movieGenreDiv.setAttribute(
    'class',
    'movie-rating row justify-end align-center',
  );

  $columnGenre.appendChild($movieGenreDiv);

  const $genreTitle = document.createElement('h2');
  $genreTitle.setAttribute('class', 'row justify-end');
  $genreTitle.textContent = 'Genres';

  $movieGenreDiv.appendChild($genreTitle);

  const $genrePillsDiv = document.createElement('div');
  $genrePillsDiv.setAttribute('class', 'row genre-pills');

  $movieGenreDiv.appendChild($genrePillsDiv);

  for (let i = 0; i < data.genre_ids.length; i++) {
    const $genrePill = document.createElement('h4');
    const genreId = data.genre_ids[i];
    const genreName: string = genreMap[genreId];
    $genrePill.setAttribute('class', 'pill__line-sm row justify-center align-center pill-genre');
    $genrePill.textContent = genreName;
    $genrePillsDiv.appendChild($genrePill);
  }

  $movieRankingWrapper.appendChild($columnGenre);
}

$row.addEventListener('click', (event: Event): void => {
  const $eventTarget = event.target as HTMLElement;

  if (!$eventTarget.matches('a')) return;

  const $card = $eventTarget.closest('.card');
  if (!$card) throw new Error('$card not found');

  const cardId = $card?.getAttribute('data-id');
  if (!cardId) throw new Error('cardId not found.')

  for (let i = 0; i < moviesArr.length; i++) {
    if (moviesArr[i].id === +cardId) {
      viewSwap('learn-more');
      renderMovieDetails(moviesArr[i]);
    }
  }
})

getMovies();
