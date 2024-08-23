# MoviePod

A frontend TypeScript project for users who want to find top-rated movies.

## Why I Built This

As a person who loves movies, I wanted to find top-rated movies and also have the option to favorite and save to a favorites list.

## Technologies Used

- TypeScript
- HTML5
- CSS3

## Live Demo

Try the application live at [https://techmatlock.github.io/moviepod/](https://techmatlock.github.io/moviepod/)

## Features

- Users can view a list of movies.
- Users can view details of a movie.
- Users can favorite a movie.
- Users can view their favorite movies.
- Users can remove a movie from their favorites.
- Users can infinite scroll to load more movies.

All of the data is being fetched from The Movie Database (TMDB) API and rendered to the site. From concept I built out the design in Figma and wrote the core logic in TypeScript.

## Preview

![MoviePod](assets/moviepod.gif)

## Challenges Encountered

- The response data I fetched from my API was difficult to assert my interface Movie since the response data had a property inside that needed to be accessed before getting the array of movie objects. Once I waited for the fulfilled promise, then I asserted the response data.results as my Movie interface.
- When I added infinite scrolling, every time the getMovies async function ran my local moviesArr copy of the response data would be overwritten with new movies instead of appending new movies to the local copy array. This was causing the learn more anchor link to not find the correct movie ID and would not swap views to the details screen. Instead, I iterated over the local copy response data and pushed new movies to my moviesArr.
- I was not able to remove movies from the favorites view by using parent element and removeChild which was giving me an "Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node." I ended up getting the closest flex child element (.column-fourth) and calling the remove() method on the element.
- I didn't need a forEach loop in my IntersectionObserver callback function. The entries array only contained one entry object so I just check if the array at index 0 was intersecting and if so, called my getMovies async function.
