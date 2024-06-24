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
  entries: Movie[];
  nextEntryId: number;
}

let data: Data = {
  view: 'home',
  entries: [],
  nextEntryId: 1
};

const foo = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDZj';
const bar =
  'MTEyZWEwOTg2N2Q4MmJjMzNmMTc0YzZjNjkyMSIsInN1YiI6IjY1YTAzN2I4NzI2ZmI';
const baz =
  'xMDEyYmY4YWY5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CU2LQtrnjr4YUnU4bl7n9bFGYwY9XJOsSiyISbpsDcs';
