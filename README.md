# front-end-project

A dynamic HTML, CSS, and TypeScript solo project.

## Challenges Encountered

- The response data I fetched from my API was difficult to assert my interface Movie[] since the response data had a property inside that needed to be accessed before getting the array of movie objects. Once I waited for the fulfilled promise, then I asserted the response data.results as my Movie[] interface.
