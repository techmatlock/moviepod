/* global data */
const $row = document.querySelector('.movies-row') as HTMLElement;

if (!$row) throw new Error('$row not found.');

async function getMovies(): Promise<void> {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDZjMTEyZWEwOTg2N2Q4MmJjMzNmMTc0YzZjNjkyMSIsInN1YiI6IjY1YTAzN2I4NzI2ZmIxMDEyYmY4YWY5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CU2LQtrnjr4YUnU4bl7n9bFGYwY9XJOsSiyISbpsDcs',
      },
    };

    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      options,
    );

    if (!response.ok) throw new Error('Failed to get a response.');

    const responseData = await response.json();
    const resultsArr = responseData.results as Movie[];

    // Render each movie to DOM
    for (let i = 0; i < resultsArr.length; i++) {
      resultsArr[i].entryId = data.nextEntryId;
      const movieElement = renderCard(resultsArr[i]);
      $row.appendChild(movieElement);
      data.nextEntryId++;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

function renderCard(data: Movie): HTMLElement {
  const $outerColumn = document.createElement('div');
  $outerColumn.setAttribute('class', 'column-fourth');
  $outerColumn.setAttribute('data-entry-id', data.entryId.toString());

  const $cardDivElement = document.createElement('div');
  $cardDivElement.setAttribute('class', 'card');

  $outerColumn.appendChild($cardDivElement);

  const $cardImage = document.createElement('img');
  $cardImage.setAttribute('class', 'card-img');
  $cardImage.setAttribute(
    'src',
    'http://image.tmdb.org/t/p/w500/' + data.poster_path,
  );
  $cardImage.setAttribute('alt', data.title);

  $cardDivElement.appendChild($cardImage);

  const $cardContent = document.createElement('div');
  $cardContent.setAttribute('class', 'card-content');

  $cardDivElement.appendChild($cardContent);

  const $cardContentRowTitle = document.createElement('div');
  $cardContentRowTitle.setAttribute('class', 'column-full row');

  const $cardTitle = document.createElement('h3');
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
  $cardBtnRow.setAttribute('class', 'column-full flex-row');

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
