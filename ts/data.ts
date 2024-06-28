/* exported data */
interface Movie {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  genre_ids: number[];
  id: number;
}

interface Data {
  view: string;
  favorites: Movie[];
}

let data: Data = {
  view: 'home',
  favorites: [],
};

const foo = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDZj';
const bar =
  'MTEyZWEwOTg2N2Q4MmJjMzNmMTc0YzZjNjkyMSIsInN1YiI6IjY1YTAzN2I4NzI2ZmI';
const baz =
  'xMDEyYmY4YWY5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CU2LQtrnjr4YUnU4bl7n9bFGYwY9XJOsSiyISbpsDcs';

const previousJsonData = localStorage.getItem('movieData');

if (previousJsonData !== null) {
  data = JSON.parse(previousJsonData);
}

window.addEventListener('beforeunload', (): void => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('movieData', jsonData);
})
