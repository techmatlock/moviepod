/* exported data */
interface Movie {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  genre_ids: number[];
  entryId: number;
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
