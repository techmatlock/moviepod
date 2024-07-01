# front-end-project

A dynamic HTML, CSS, and TypeScript solo project.

## Challenges Encountered

- The response data I fetched from my API was difficult to assert my interface Movie[] since the response data had a property inside that needed to be accessed before getting the array of movie objects. Once I waited for the fulfilled promise, then I asserted the response data.results as my Movie[] interface.
- Needed to revise one of my render functions to style the hearts by default as non-solid. My original solution was trying to set the heart as solid if the element id and icon id matched and a else block to set to non-solid if the iteration failed once. But if my iteration failed once, then the entire loop would set the heart to non-solid. Instead, I needed to set all icons to non-solid and if a movie was in my global data favorites property, set the heart icon as solid. No else block was needed.
- When I added infinite scrolling, every time the getMovies async function ran my local moviesArr copy of the response data would be overwritten with new movies instead of appending new movies to the local copy array. This was causing the learn more anchor link to not find the correct movie ID and would not swap views to the details screen. Instead, I iterated over the local copy response data and pushed new movies to my moviesArr.
- I was not able to remove movies from the favorites view by using parent element and removeChild which was giving me an "Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node." I ended up getting the closest flex child element (.column-fourth) and calling the remove() method on the element.
- I didn't need a forEach loop in my IntersectionObserver callback function. The entries array only contained one entry object so I just check if the array at index 0 was intersecting and if so, called my getMovies async function.
