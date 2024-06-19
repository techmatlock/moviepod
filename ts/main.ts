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
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options
    );

    if (!response.ok) throw new Error('Failed to get a response.');

    const data = await response.json();

    const movies = data.results;
    return movies;

  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

const movies = getMovies();
